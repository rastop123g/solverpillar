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
        setTimeout(() => {
            this.$emit('next')
        }, 3000)
    }
}
</script>

<style scoped>

</style>
