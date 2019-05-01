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
                        <div class="form"></div>
                    </el-main>
                </div>
            <div class="buttonscontainer">
                <el-button type="danger" round>Удалить</el-button>
                <el-button type="primary" round>Создать</el-button>
                <el-button type="success" round>Сохранить</el-button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../ipc/ipcRenderer.js'

export default {
    data () {
        return {
            currentId : '',
            listdata : [],
            form: {}
        }
    },
    methods: {
        selectIt (id) {
            this.currentId = id;
        }
    },
    mounted () {
        db.select({}, 'pillars').then((data) => {
            this.listdata = []
            data.forEach((item, i) => {
                this.listdata[i] = {}
                this.listdata[i].name = item.name;
                this.listdata[i].id = item._id;
                if(i == 0) this.currentId = item._id;
            })
        })
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

.form {
    display: grid;
}
</style>
