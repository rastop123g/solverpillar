<template>
    <div class="start-page">
        <h1 class="logoname">olverPillar</h1>
        <el-divider />
        <div id="contentSP">
            <div class="tag-container">
            <img id="tagsSP" src="../../public/img/tagsSP.svg" alt="tagsSp">
            <p style="left: 245px;top: 16px;">Перейти в окно расчета максимального пролета между опорами </p>
            <p style="top: 125px;left: 160px;">Здесь вы можете добавить, удалить и редактировать компоненты</p>
            <p style="top: 232px;left: 245px;">Чтобы получить помощь по использованию программы нажмите сюда</p>
            <p style="left: 160px;top: 330px;">Изменить глобальные настройки и коэффициенты влияющие на результат вычислений можно здесь</p>
            <p style="left: 245px;top: 450px;">Почитать о программе и узнать @email для связи с разработчиком</p>
            </div>
            <div class="SPleft">
                <img src="../../public/img/anker.png" height="450px" alt="anker">
                <el-button type="default" id="go-calc" round>Перейти к расчету <i class="el-icon-arrow-right"></i></el-button>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router';

export default {
    name: 'startpage',
    methods: {
        stmharrow () {
            document.querySelector('.tag-container').style.top = document.querySelector('#mathbtn').getBoundingClientRect().top - 187 + 'px';
        },
    },
    mounted () {
        this.stmharrow();
        window.onresize = (event) => {
            if(router.currentRoute.fullPath == '/start'){
                this.stmharrow();
            }
        };
        document.querySelector('#contentSP').style.height = document.querySelector('.start-page').offsetHeight - 105 + 'px';
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Marck+Script');

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
    height: 20%;
}

#go-calc {
    color: white;
    background-color: #232323;
    font-size: 14pt;
    text-shadow: 0 0 1px black;
}

.start-page {
    height: calc(100vh - 60px);
}

.SPleft {
    display: grid;
    grid-template: 1fr 40px 50px / 1fr;
    align-items: center;
    justify-items: center;
    grid-gap: 30px;
}

p {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 210px;
    font-family: 'Marck Script';
    color: #353535;
    text-shadow: 0 0 1px black;
    font-size: 18px;
}

.el-divider {
    margin: 0px 2px 10px 2px;
}

#name {
    text-align: center;
}

#contentSP {
    display: grid;
    grid-template: 1fr / 5fr 3fr;
}

.logoname {
    color: #232323;
    font-size: 64px;
    margin: 0;
    font-family: 'Monoton', cursive;
    font-weight: 400;
}

.tag-container {
    height: 540px;
    padding-left: 5px;
    position: relative;
}

#tagsSP {
    height: 100%;
    position: absolute;
}
</style>
 