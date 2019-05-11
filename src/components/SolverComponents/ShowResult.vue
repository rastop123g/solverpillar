<template>
    <div>
        <p>Максимальный пролет: {{maxspan}} м</p>
        <p>Максимальный изгибающий момент: {{maxM}} кН/м</p>
        <p>Максимальные нормальные напряжения: {{maxTension}} МПа</p>
        <ngraph name="Распределение Нормальной силы по оси z" :data="graphics.N"></ngraph>
        <ngraph name="Изгибающий момент по оси z" :data="graphics.M"></ngraph>
        <ngraph name="Максимальные сжимающие напряжения в сечении" :data="graphics.tension"></ngraph>
    </div>
</template>

<script>
import Ngraph from './Graphics/Ngraph'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        maxspan() {
            return Math.floor(this.$store.state.result.span)
        },
        maxM() {
            return Math.round(this.$store.state.result.max_M * 0.1) / 100
        },
        maxTension() {
            return Math.round(this.$store.state.result.max_tension / 10000) / 100
        },
        graphics() {
            return this.$store.state.graphs
        }
    },
    components: {
        Ngraph
    }
}
</script>

<style scoped>

</style>
