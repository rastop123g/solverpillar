<template>
    <div class="edittraversa">
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
                                <p>Масса:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите массу траверсы" v-model="form.weight" />
                                </div>
                            </div>
                            <div class='elform'>
                                <div class="labelform">
                                <p>Площадь:</p>
                                </div>
                                <div class="inputform">
                                <el-input style="width: 300px" placeholder="Введите площадь поперечного сечения" v-model="form.area" />
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
        validateForm () {
            return {
                name: this.form.name,
                voltage: this.form.voltage,
                weight: toN(this.form.weight),
                area: toN(this.form.area),
            }
        }
    },
    methods: {
        selectIt (id) {
            this.currentId = id;
            db.select({_id: id}, 'traverses').then(data => {
                delete data[0]._id
                this.form = data[0]
            }) 
        },
        createEl () {
            db.insert(this.validateForm, 'traverses').then(data => {
                if(data.name == this.validateForm.name){
                    this.$notify({
                      title: 'Успешно',
                      message: 'Вы успешно добавили компонент',
                      type: 'success'
                    });
                }
                this.getAllel(data._id);
            })
        },
        deleteEl () {
            db.remove({_id: this.currentId}, 'traverses').then(num => {
                if(num == 1){
                    this.$notify({
                      title: 'Успешно',
                      message: 'Вы успешно удалили компонент',
                      type: 'success'
                    });
                }
            })
            this.getAllel();
        },
        updateEl () {
            db.update({_id: this.currentId}, this.validateForm, 'traverses').then(status =>{
                if(status == 'ok') {
                    this.$notify({
                      title: 'Успешно',
                      message: 'Вы успешно изменили компонент',
                      type: 'success'
                    });
                }
            })
        },
        getAllel(id) {
            db.select({}, 'traverses').then((data) => {
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
