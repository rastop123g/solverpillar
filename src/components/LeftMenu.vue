<template>
    <div class="left-menu">
        <div id="topspace">
            <h1 id="Slogo">S</h1>
        </div>
        <div id="tts">
        <el-tooltip class="item" popper-class="lmtooltip" effect="dark" content="Расчет" placement="right">
            <el-button id="mathbtn" plain circle ><i id="isqr" class="fas fa-square-root-alt"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" popper-class="lmtooltip" effect="dark" content="Редактор компонентов" placement="right">
            <el-button plain circle @click="goEditor"><i class="el-icon-edit"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" popper-class="lmtooltip" effect="dark" content="Помощь" placement="right">
            <el-button plain circle ><i class="el-icon-help"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" popper-class="lmtooltip" effect="dark" content="Настройки" placement="right">
            <el-button plain circle ><i class="el-icon-set-up"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" popper-class="lmtooltip" effect="dark" content="О программе" placement="right">
            <el-button plain circle ><i class="el-icon-info"></i></el-button>
        </el-tooltip>
    </div>
    <div id="botspace"></div>
    </div>
</template>

<script>
import router from '../router.js'

export default {
    data (){
        return {
            
        }
    },
    methods: {
        goEditor () {
            router.push('/component-editor');
        },
    },
    mounted (){
    }
}
</script>

<style scoped>
.left-menu {
    box-shadow: 0 0 5px black;
    padding: 5px;
    display: grid;
    grid-template-rows: 2.5fr 4fr 4fr;
    align-items: center;
}

.el-button {
    font-size: 20px;
    color: #232323;
    border:none;
}

.el-button+.el-button {
    margin: 0;
}

.el-button.is-plain:focus, .el-button.is-plain:hover {
    background: #FFF;
    font-size: 20px;
    box-shadow: 0 0 20px black;
    border:none;
    color: #232323;
}

#isqr {
    width: 20px;
}

#tts {
    display: grid;
    grid-template: repeat(1fr) / 1fr;
    grid-row-gap: 10px;
}
 #topspace {
     align-self: start;
 }

 #Slogo {
    color: white;
    font-size: 64px;
    margin: 0;
    padding: 0;
    font-family: 'Monoton', cursive;
    font-weight: 400;
 }
</style>

<style>
.lmtooltip {
    font-size: 12pt !important;
}
</style>
