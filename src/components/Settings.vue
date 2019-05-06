<template>
    <div class="settings">
        <h1>Глобальные настройки</h1>
        <el-main class="settings-container">
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="8"><p>Коэффициент длины провода:</p></el-col>
              <el-col :span="4"><el-input v-model="K_lwire" placeholder=""></el-input></el-col>
              <el-col :span="11"></el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed: {
        K_lwire: {
            get() {
                return this.$store.state.settings.K_lwire
            },
            set(value) {
                this.$store.commit('settings/setK_lwire', value)
            }
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #232323;
}

p {
    line-height: 40px;
    margin: 0 10px 0 0;
    text-align: right;
}

.settings-container {
    height: calc(100vh - 57px - 60px);
    margin: 5px;
    margin-top: 20px;
}
</style>
