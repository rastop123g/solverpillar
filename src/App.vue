<template>
  <div id='main'>
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

export default {
  name: 'app',
  mounted () {
    router.push('/start')
  }
}
</script>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex: 0 0 auto;
  background-color: #232323;
  box-shadow: 0 0 10px black;
  color: #d4d1dc;
  text-shadow: 1px 1px 1px #000;
}

.el-divider {
  margin: 0;
}
#copy {
  text-align: center;
}

</style>
