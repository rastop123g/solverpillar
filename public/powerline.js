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
            ice: line.climat.ice / 1000,
            maxt: line.climat.maxt,
            mint: line.climat.mint,
        };
        this.settings = settings;
        Object.freeze(this.pillar);
        Object.freeze(this.wire);
        Object.freeze(this.isolator);
        Object.freeze(this.traversa);
        Object.freeze(this.settings);
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

    // изменение ширины по длине (от верхней точки)
    f_bt() {
        return z => {
            return ((this.pillar.t - this.pillar.b) / this.pillar.length) * z + this.pillar.b
        }
    }

    //Центр тяжести от верхней точки
    cg(z) {
        return this.integrateX(z => {
            return (this.f_bt()(z) * z)
        }, 0, z, 1024) / this.integrateX(this.f_bt(), 0, z, 1024)
    }

    //Интеграл
    integrateX(func, a, b, frac) {
        let sum = 0;
        let dx = (b - a) / frac;
        let mid = dx / 2;
        for(let i = 0; i < frac; i++) {
            sum += func(i * dx + mid) * dx;
        }
        return sum;
    }

    //Подготовительные
    preparation() {
        this.result.densityPillar = this.pillar.weight / this.V_z(this.S_z(), this.pillar.length); //Плотность опоры
        this.result.upground = this.pillar.length - this.common.underground; //Над землей
        this.m_ice = (((Math.PI * (this.wire.diametr + 2 * this.climat.ice) ** 2) / 4) - ((Math.PI * this.wire.diametr ** 2) / 4)) * 916.7; //масса льда на 1 м длинны провода
    }
}