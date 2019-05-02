<template>
    <div class="editpillar">
        <div class="grid-edit-content">
            <div class="leftblockeditor">
                <el-main>
                    <el-button 
                        v-for="item in listdata" 
                        :key="item.id" 
                        class="libtn"
                        :class="{activeIL: (item.id == currentId) ? true : false}"
                        type="text"
                        @click="selectIt(item.id)"
                    >
                        {{item.name}}
                    </el-button>
                </el-main>
            </div>
            <div class="rightblockeditor">
                <div class="formeditright">
                    <el-main>
                        <div class="form">
                            <div class='elform'>
                                <div class="labelform">
                                <p>Название:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите имя" v-model="form.name" />
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Напряжение:</p>
                                </div>
                                <div class="inputform">
                                <el-select v-model="form.voltage" placeholder="Выберите напряжение">
                                  <el-option v-for="volt in voltage" :key="volt" :label="volt" :value="volt"></el-option>
                                </el-select>
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Длина:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите длину" v-model="form.length" />
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Масса:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите массу" v-model="form.weight" />
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Сечение:</p>
                                </div>
                                <div class="inputform">
                                <el-select v-model="form.section" placeholder="Выберите тип сечения">
                                  <el-option v-for="sec in section" :key="sec.value" :label="sec.name" :value="sec.value"></el-option>
                                </el-select>
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>h:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите h" v-model="form.h" />
                                </div>
                            </div>
                            <div v-if="form.section == 'T'" class='elform'>
                                <div class="labelform">
                                <p>h1:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите h1" v-model="form.h1" />
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>b:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите b" v-model="form.b" />
                                </div>
                            </div>
                            <div v-if="form.section == 'T'" class='elform'>
                                <div class="labelform">
                                <p>t:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите t" v-model="form.t" />
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Бетон:</p>
                                </div>
                                <div class="inputform">
                                <el-select v-model="form.beton" placeholder="Выберите марку бетона">
                                  <el-option v-for="b in beton" :key="b" :label="b" :value="b"></el-option>
                                </el-select>
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Момент:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите максимальный изгибающий момент" v-model="form.moment" />
                                </div>
                            </div>
                        </div>
                    </el-main>
                </div>
            <div class="buttonscontainer">
                <el-button type="danger" round @click="deleteEl">Удалить</el-button>
                <el-button type="primary" round @click="createEl">Создать</el-button>
                <el-button type="success" round @click="updateEl">Сохранить</el-button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../ipc/ipcRenderer.js'
import commFn from '../../commFn.js'
let toN = commFn.toN

export default {
    data () {
        return {
            currentId : '',
            listdata : [],
            form: {}
        }
    },
    computed: {
        voltage () {
            return this.$store.state.variantVoltage
        },
        section () {
            return this.$store.state.variantSection
        },
        beton () {
            return this.$store.state.beton
        },
        validateForm () {
            return {
                name: this.form.name,
                voltage: this.form.voltage,
                length: toN(this.form.length),
                weight: toN(this.form.weight),
                section: this.form.section,
                h: toN(this.form.h),
                h1: toN(this.form.h1),
                b: toN(this.form.b),
                t: toN(this.form.t),
                beton: this.form.beton,
                moment: toN(this.form.moment),
            }
        }
    },
    methods: {
        selectIt (id) {
            this.currentId = id;
            db.select({_id: id}, 'pillars').then(data => {
                delete data[0]._id
                this.form = data[0]
            }) 
        },
        createEl () {
            db.insert(this.validateForm, 'pillars').then(data => {
                if(data.name == this.validateForm.name){
                    this.$message({
                        message: 'Вы успешно добавили эллемент',
                        type: 'success'
                    });
                }
                this.getAllel(data._id);
            })
        },
        deleteEl () {
            db.remove({_id: this.currentId}, 'pillars').then(num => {
                if(num == 1){
                    this.$message({
                        message: 'Вы успешно удалили эллемент',
                        type: 'success'
                    });
                }
            })
            this.getAllel();
        },
        updateEl () {
            db.update({_id: this.currentId}, this.validateForm, 'pillars').then(status =>{
                if(status == 'ok') {
                    this.$message({
                        message: 'Вы успешно изменили эллемент',
                        type: 'success'
                    });
                }
            })
        },
        getAllel(id) {
            db.select({}, 'pillars').then((data) => {
                this.listdata = []
                data.forEach((item, i) => {
                    this.listdata[i] = {}
                    this.listdata[i].name = item.name;
                    this.listdata[i].id = item._id;
                })
                this.listdata.sort((a, b) => {
                    if(a.name < b.name){
                        return -1
                    } else {
                        return 1
                    }
                })
                if(id === undefined) {
                    this.currentId = this.listdata[0].id;
                } else {
                    this.currentId = id
                }
                this.selectIt(this.currentId)
            })
        }
    },
    mounted () {
        this.getAllel();
    }
}
</script>

<style scoped>

</style>

<style>
.buttonscontainer {
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr;
}

.formeditright {
    border: 2px solid #dedede;
    border-radius: 5px;
    padding: 5px;
    overflow: auto
}

.grid-edit-content {
    display: grid;
    grid-gap: 15px;
    grid-template: 1fr / 1fr 3fr;
    height: calc(100vh - 60px - 115px);
}

.rightblockeditor {
    display: grid;
    grid-gap: 15px;
    grid-template: 1fr 40px / 1fr;
    overflow: auto;
}

.leftblockeditor {
    padding: 5px;
    border: 2px solid #dedede;
    border-radius: 5px;
    overflow: auto;
}

main {
    padding: 0 !important;
    height: 100%;
}

.libtn {
    width: 100% !important;
    text-align: left !important;
    color: #232323 !important;
    padding-left: 5px !important;
    border-radius: 0px !important;
}

.activeIL {
    background-color: #232323 !important;
    color: white !important;
}

.libtn+.libtn {
    margin-left: 0 !important;
}

.elform {
    display: grid;
    grid-template-columns: 1fr 3fr;
}

.labelform {
    display: grid;
    align-items: center;
    justify-items: right;
    padding-right: 10px;
    color: #232323;

}

.inputform {
    display: grid;
    align-items: center;
    justify-items: left;
}
</style>
