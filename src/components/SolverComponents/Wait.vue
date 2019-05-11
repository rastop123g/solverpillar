<template>
    <div >
        <el-main v-loading="true" style="height: 514px;">
        </el-main>
    </div>
</template>

<script>
export default {
    mounted () {
        this.$store.dispatch('calculate')
        this.timer = setInterval(() => {
            if(this.$store.state.ready == true) {
                this.$emit('next')
                clearInterval(this.timer)
                this.$store.commit('ready', false)
            }
        })
    }
}
</script>

<style scoped>

</style>
