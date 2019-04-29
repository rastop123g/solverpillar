<template>
    <div class="start-page">
        <el-divider></el-divider>
        <el-row>
          <el-col :span="24">
            <object type="image/svg+xml" data="pillar.svg" width="100%" height="400" >
               Your browser does not support SVG
            </object>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <h1 id="name">SolverPillar</h1>
          </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script>
import store from '../store.js'
import db from '../ipc/ipcRenderer'
import { mapState } from 'vuex'

export default {
    name: 'startpage',
    data (){
        return {
            names: '',
            db: {},
            rows: [],
            recive: []
        }
    },
    computed : {
        ...mapState({
            powerline: state => state.powerline,
            pillar: state => state.powerline.pillar
        }),
        text (){

        }
    },
    methods: {
        setnewtext(){
            console.log(this.pillar.name)
        },
        setrow(){
            ipcRenderer.send('set_row_pillars', {
                name: 'Опора 1',
                weight: '120кг'
            })
        },
        getrow(){
            db.select({}, 'pillars').then(doc => {
                this.recive = doc
            })
        },
        setVoltage(){
            store.commit('powerline/pillar/setName', 'Опора 1')
        }
    },
    mounted () {
        console.log(store)
    }
}
</script>

<style>
.my_btn:focus, .my_btn:hover {
  color: #ffffff;
  border-color: #232323;
  text-shadow: 3px 3px 3px black;
  background-color: #232323;
  box-shadow: 0 0 5px black;
}

.my_btn {
  background: #232323;
  border: 1px solid #DCDFE6;
  color: #e6e6e6;
}
</style>
 
 <style scoped>

#logo {
    width: 100%;
    height: 20%
}

#name {
    text-align: center
}
 </style>
 