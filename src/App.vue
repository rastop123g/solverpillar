<template>
  <div id='main'>
    <left-menu id="leftmenu" />
    <div class="content">
    <router-view></router-view>
    </div>
    <div class="footer">
      <p id='copy'><i class="el-icon-minus"></i> Оренбург,	Новации 2019 <i class="el-icon-minus"></i></p>
    </div>
  </div>
</template>

<script>
import router from './router.js'
import LeftMenu from './components/LeftMenu'

export default {
  name: 'app',
  components: {
    LeftMenu
  },
  mounted () {
    router.push('/start')
  }
}
</script>

<style scoped>

.content {
  margin-left: 50px;
  padding: 5px;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #232323;
  box-shadow: 0 0 10px black;
  color: #d4d1dc;
  text-shadow: 1px 1px 1px #000;
}

#copy {
  text-align: center;
}

#leftmenu {
  position: fixed;
  left:0;
  top:0;
  height: 100%;
  background-color: #232323;
}
</style>
