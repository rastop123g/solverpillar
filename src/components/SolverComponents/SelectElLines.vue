<template>
    <div id="select-el-lines">
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Напряжение:</p>
            </div>
            <div class="grid-centering">
                <el-select @change="changeVoltage" v-model="result.voltage" placeholder="Выберите напряжение">
                  <el-option v-for="volt in voltage" :key="volt" :label="volt" :value="volt"></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="active.pillars" class="formrow">
            <div class="grid-centering">
                <p class="form-label">Опора:</p>
            </div>
            <div class="grid-centering">
                <el-select @change="changePillar" v-model="result.pillar" placeholder="Выберите опору">
                  <el-option v-for="pillar in pillars" :key="pillar.id" :label="pillar.name" :value="pillar.id"></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="active.pillars" class="formrow">
            <div class="grid-centering">
                <p class="form-label">Глубина заглубления:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="Введите глубину в метрах" v-model="result.underground" />
            </div>
        </div>
        <div v-if="active.wires" class="formrow">
            <div class="grid-centering">
                <p class="form-label">Провод:</p>
            </div>
            <div class="grid-centering">
                <el-select @change="changeWire" v-model="result.wire" placeholder="Выберите провод">
                  <el-option v-for="wire in wires" :key="wire.id" :label="wire.name" :value="wire.id"></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="active.wires" class="formrow">
            <div class="grid-centering">
                <p class="form-label">Количество:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="Введите количество проводов" :class="{error : isError}" v-model="result.numwires" />
            </div>
            <div v-if="isError"></div>
            <p v-if="isError" style="margin:0; color: #F56C6C">Введите целое число</p>
        </div>
        <!--  -->
        <div v-if="active.isolators" class="formrow">
            <div class="grid-centering">
                <p class="form-label">Изолятор:</p>
            </div>
            <div class="grid-centering">
                <el-select @change="changeIT" v-model="result.isolator" placeholder="Выберите Изолятор">
                  <el-option v-for="isolator in isolators" :key="isolator.id" :label="isolator.name" :value="isolator.id"></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="active.isolators" class="formrow">
            <div class="grid-centering">
                <p class="form-label">Траверса:</p>
            </div>
            <div class="grid-centering">
                <el-select @change="changeIT" v-model="result.traversa" placeholder="Выберите Траверсу">
                  <el-option v-for="traversa in traverses" :key="traversa.id" :label="traversa.name" :value="traversa.id"></el-option>
                </el-select>
            </div>
        </div>
        <el-button v-if="isAll" type="success" round @click="next">Продолжить <i class="el-icon-right"></i></el-button>
    </div>
</template>

<script>
import store from '../../store.js'
import db from '../../ipc/ipcRenderer.js'
import commFn from '../../commFn'

export default {
    data () {
        return {
            active: {
                pillars: false,
                wires: false,
                isolators: false,
            },
            result: {},
            wires: [],
            pillars: [],
            isolators: [],
            traverses: [],
            isError: false,
            changed: false,
            isAll: false,
            sort: (a, b) => {
                    if(a.name < b.name){
                        return -1
                    } else {
                        return 1
                    }
                },
        }
    },
    computed: {
        voltage () {
            return store.state.variantVoltage.slice(1)
        },
        nums () {
            return this.result.numwires
        },
        under () {
            return this.result.underground
        }
    },
    watch: {
        changed () {
            if(this.active.isolators) {
                this.isAll = (Object.keys(this.result).length == 7) ? true : false
            } else {
                this.isAll = (Object.keys(this.result).length == 5) ? true : false
            }
        },
        nums () {
            this.changed = !this.changed
            if(~this.result.numwires.indexOf('.') || ~this.result.numwires.indexOf(',')) {
                this.isError = true;
            } else {
                this.isError = false;
            }
        },
        under () {
            this.changed = !this.changed
        }
    },
    methods : {
        clearResult (list) {
            list.forEach(item => {
                delete this.result[item]
            })
        },
        clearEl (list) {
            list.forEach(item => {
                this[item] = []
            })
        },
        clearAct (list) {
            list.forEach(item => {
                this.active[item] = false
            })
        },
        clear (obj) {
            this.clearResult(obj.R);
            this.clearEl(obj.E);
            this.clearAct(obj.A);
        },
        changeVoltage () {
            this.changed = !this.changed
            this.clear({
                R: ['pillar', 'underground', 'wire', 'numwires', 'isolator', 'traversa'],
                E: ['pillars', 'wires', 'isolators', 'traverses'],
                A: ['pillars', 'wires', 'isolators']
            })
            db.select({ $or : [{voltage: this.result.voltage}, {voltage: 0}]}, 'pillars').then(data => {
                this.pillars = []
                data.forEach((item, i) => {
                    this.pillars.push({
                        id: item._id,
                        name: item.name
                    })
                })
                this.pillars.sort(this.sort)
                this.active.pillars = true
            })
        },
        changePillar () {
            this.changed = !this.changed
            this.clear({
                R: ['wire', 'numwires', 'isolator', 'traversa'],
                E: ['wires', 'isolators', 'traverses'],
                A: ['wires', 'isolators']
            })
            db.select({ $or : [{voltage: this.result.voltage}, {voltage: 0}]}, 'wires').then(data => {
                this.wires = []
                data.forEach((item, i) => {
                    this.wires.push({
                        id: item._id,
                        name: item.name,
                        isolator: item.isolator
                    })
                })
                this.wires.sort(this.sort)
                this.active.wires = true
            })
        },
        changeWire () {
            this.changed = !this.changed
            this.clear({
                R: ['numwires', 'isolator', 'traversa'],
                E: ['isolators', 'traverses'],
                A: ['isolators']
            })
            this.wires.forEach((item, i) => {
                if(item.id == this.result.wire && item.isolator == true) {
                    db.select({ $or : [{voltage: this.result.voltage}, {voltage: 0}]}, 'isolators').then(data => {
                        this.isolators = []
                        data.forEach((item, i) => {
                            this.isolators.push({
                                id: item._id,
                                name: item.name
                            })
                        })
                        this.isolators.sort(this.sort)
                    })
                    db.select({ $or : [{voltage: this.result.voltage}, {voltage: 0}]}, 'traverses').then(data => {
                        this.traverses = []
                        data.forEach((item, i) => {
                            this.traverses.push({
                                id: item._id,
                                name: item.name
                            })
                        })
                        this.traverses.sort(this.sort)
                        this.active.isolators = true;
                    })
                }
            })
        },
        changeIT () {
            this.changed = !this.changed
        },
        next () {
            store.commit('powerline/setVoltage', this.result.voltage)
            store.commit('powerline/setNumwires', this.result.numwires)
            store.commit('powerline/setUnderground', commFn.toN(this.result.underground))
            store.dispatch('powerline/pillar/setPillar', this.result.pillar)
            store.dispatch('powerline/wire/setWire', this.result.wire)
            store.dispatch('powerline/isolator/setIsolator', this.result.isolator)
            store.dispatch('powerline/traversa/setTraversa', this.result.traversa)
            this.$emit('next')
        }
    },
}
</script>

<style scoped>
#select-el-lines {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    grid-gap: 15px;
}

</style>

<style>
.formrow {
    display: grid;
    grid-template-columns: 250px 300px;
    align-content: center;
}

.form-label {
    text-align: right;
    padding-right: 10px;
    margin: 0;
    line-height: 40px;
}

.grid-centering {
    display: grid;
    align-items: center;
}
</style>
