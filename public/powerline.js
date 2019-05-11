// eslint-disable-next-line no-unused-vars
class Powerline {
    constructor(line, settings) {
        this.pillar = {
            length: line.pillar.length / 1000,
            weight: line.pillar.weight * 1000,
            section : line.pillar.section,
            h: line.pillar.h / 1000,
            h1: line.pillar.h1 / 1000,
            b: line.pillar.b / 1000,
            t: line.pillar.t / 1000,
            beton: line.pillar.beton,
            moment: line.pillar.moment * 9810,
        };
        this.wire = {
            weight: line.wire.weight / 1000,
            diametr: line.wire.diametr / 1000,
            isolator: line.wire.isolator
        };
        this.isolator = {
            weight : line.isolator.weight
        };
        this.traversa = {
            weight : line.traversa.weight
        };
        this.common = {
            numwires: line.numwires,
            underground: line.underground,
        };
        this.climat = {
            wind: line.climat.wind,
            K_w: line.climat.K_w,
            ice: line.climat.ice / 1000,
            K_ice: line.climat.K_ice,
            maxt: line.climat.maxt,
            mint: line.climat.mint,
        };
        this.settings = settings;
        Object.freeze(this.pillar);
        Object.freeze(this.wire);
        Object.freeze(this.isolator);
        Object.freeze(this.traversa);
        //Object.freeze(this.settings);
        this.result = {};
    }

    //площадь по оси z (от верхней точки)
    S_z() {
        if(this.pillar.section == 'T') {
            return z => {
                return (((this.pillar.h + this.pillar.h1) * (z * (this.pillar.t - this.pillar.b) + this.pillar.b * this.pillar.length)) / (2 * this.pillar.length))
            }
        } else {
            return () => {
                return this.pillar.h * this.pillar.b
            }
        }
    }

    V_z(z) {
        return this.integrateX(this.S_z(), 0, z, 1024)
    }

    // от собственного веса
    selfN_z(z) {
        return this.V_z(z) * this.result.densityPillar * 9.81
    }

    //от веса провода включая массу льда
    wireN_z(span) {
        return (span * this.settings.K_lwire) * (this.wire.weight + this.m_ice) * this.common.numwires * 9.81
    }

    armaN_z() {
        return (this.isolator.weight * this.common.numwires + this.traversa.weight) * 9.81
    }

    // Площадь воздействия ветровой нагрузки на провода
    S_wind_wire(span) {
        return ((this.wire.diametr + 2 * this.climat.ice * this.climat.K_ice * K_bd(this.wire.diametr)) * span * this.settings.K_lwire) * this.common.numwires
    }

    //горизонтальная сила от ветра на провода 1,2 - аэродинамический кф
    Fx_wind_wire(span) {
        return this.S_wind_wire(span) * a_w(this.result.W_wind) * this.result.W_wind * 1.2
    }

    //гор сила от воздейств ветра на опору 1.5 - кф порывов ветра 2 - аэродинамический кф
    Fx_wind_pillar(z) {
        return this.integrateX(this.f_bt(), 0 , z, 1024) * this.result.W_wind * 1.5 * 2
    }

    My(span, z) {
        return this.Fx_wind_wire(span) * z + this.Fx_wind_pillar(z) * (z - this.cg_wind(z))
    }

    Nz(span, z) {
        return this.selfN_z(z) + this.wireN_z(span) + this.armaN_z()
    }

    // изменение ширины по длине (от верхней точки)
    f_bt() {
        return z => {
            return ((this.pillar.t - this.pillar.b) / this.pillar.length) * z + this.pillar.b
        }
    }

    //Центр тяжести от верхней точки
    cg_wind(z) {
        return this.integrateX(z => {
            return (this.f_bt()(z) * z)
        }, 0, z, 1024) / this.integrateX(this.f_bt(), 0, z, 1024)
    }

    Jm_z(z) {
        let f = z => {
            return y => {
                if(y > - this.pillar.h1 / 2 && y < this.pillar.h1 / 2) {
                    return this.f_bt()(z) * y * y
                } else {
                    return ((2 * Math.abs(y) - this.pillar.h1) / (this.pillar.h - this.pillar.h1)) * this.f_bt()(z) * y * y
                }
            }
        }
        return this.integrateX(f(z), -this.pillar.h / 2, this.pillar.h / 2 , 1024)
    }

    //Интеграл
    integrateX(func, a, b, frac) {
        let sum = 0;
        let dx = (b - a) / frac;
        let mid = dx / 2;
        for(let i = 0; i < frac; i++) {
            sum += func(i * dx + mid + a) * dx;
        }
        return sum;
    }

    //Подготовительные
    preparation() {
        this.result.densityPillar = this.pillar.weight / this.V_z(this.pillar.length); //Плотность опоры
        this.result.upground = this.pillar.length - this.common.underground; //Над землей
        //масса льда на 1 м длинны провода
        this.m_ice = (((Math.PI * (this.wire.diametr + 2 * this.climat.ice * this.climat.K_ice) ** 2) / 4) - ((Math.PI * this.wire.diametr ** 2) / 4)) * 916.7;
        this.result.W_wind = (Math.pow(this.climat.wind, 2) / 1.6) * this.climat.K_w //Ветровое давление Па
    }

    solve(span) {
        let out = []
        const frac_z = 1024
        const frac_y = 256
        let max_M = 0, max_tension = 0;
        for(let z = 0; z <= this.result.upground; z += this.result.upground / frac_z) {
            let Nz = this.Nz(span, z)
            let My = this.My(span, z)
            max_M = (My > max_M) ? My : max_M;
            out.push({
                z: z,
                N: Nz,
                M: My,
                tensions: []
            })
            let Jm_z = this.Jm_z(z)
            let tension_N = (Nz / this.S_z()(z))
            for(let y = -this.pillar.h / 2; y <= this.pillar.h / 2; y += this.pillar.h / frac_y) {
                let tension = tension_N + (My / Jm_z) * y
                max_tension = (tension > max_tension) ? tension : max_tension;
                out[out.length - 1].tensions.push({
                    y,
                    tension, 
                })
            }
        }
        return {
            span,
            out,
            max_M,
            max_tension
        }
    }

    createGraphs(out) {
        let graphs = {
            N: {
                x: [],
                y: [],
                xname: 'Координата z, м',
                yname: 'Нормальная сила, кН'
            },
            M: {
                x: [],
                y: [],
                xname: 'Координата z, м',
                yname: 'Изгибающий момент, кН * м'
            },
            tension: {
                x: [],
                y: [],
                xname: 'Координата z, м',
                yname: 'Максимальные напряжения в сечении, МПа'
            },
        }
        Array.prototype.last = function() {
            return this[this.length - 1];
        }
        out.forEach(item => {
            graphs.N.x.push((isNaN(item.z)) ? 0 : item.z);
            graphs.N.y.push((isNaN(item.N)) ? 0 : item.N / 1000);
            graphs.M.x.push((isNaN(item.z)) ? 0 : item.z);
            graphs.M.y.push((isNaN(item.M)) ? 0 : item.M / 1000);
            graphs.tension.x.push((isNaN(item.z)) ? 0 : item.z);
            graphs.tension.y.push((isNaN(item.tensions.last().tension)) ? 0 : item.tensions.last().tension / 1000000)
        })
        return graphs
    }
}

//кф неравномерности ветровой нагрузки по длине провода от ветрового давления
function a_w(W) {
    let table = [[200, 1], [240, 0.94], [280, 0.88], [300, 0.85], [320, 0.83], [360, 0.8], [400, 0.76], [500, 0.71], [580, 0.7]]
    let buffer_min = 1;
    let buffer_max = 0.7
    table.some(item => {
    if(W > item[0]) {
        buffer_min = item[1]
    }
    else {
        buffer_max = item[1]
        return (buffer_max + buffer_min) / 2
    }
    })
    return (buffer_max + buffer_min) / 2
}

function K_bd(d) {
    let table = [[10, 1], [20, 0.9], [30, 0.8], [50, 0.7], [70, 0.6]]
    let buffer_min = 1;
    let buffer_max = 0.6;
    table.some(item => {
        if(d * 1000 > item[0]) {
            buffer_min = item[1]
        }
        else {
            buffer_max = item[1]
            return (buffer_max + buffer_min) / 2
        }
    })
    return (buffer_max + buffer_min) / 2
}