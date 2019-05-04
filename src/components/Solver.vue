<template>
    <div id="solver">
        <h1>Расчет Максимального пролета</h1>
        <div class="solver-content">
            <el-main id="main">
                <component :is="idComponent" @next="nextComponent"></component>
            </el-main>
            <el-steps :active="active" align-center finish-status="success" process-status="finish">
              <el-step title="Этап 1" description="Выбор элементов линии"></el-step>
              <el-step title="Этап 2" description="Выбор климатических условий"></el-step>
              <el-step title="Этап 3" description="Результат"></el-step>
            </el-steps>
        </div>
    </div>
</template>

<script>
import SelectElLines from './SolverComponents/SelectElLines'
import SelectClimat from './SolverComponents/SelectClimat'
import Wait from './SolverComponents/Wait'

export default {
    data () {
        return {
            active: 0,
            idComponent: 'SelectElLines',
            listComponents: ['SelectElLines', 'SelectClimat', 'Wait'],
            currentCid: 0
        }
    },
    components: {
        SelectElLines,
        SelectClimat,
        Wait
    },
    methods: {
        nextComponent () {
            this.idComponent = this.listComponents[++this.currentCid];
            this.active++;
        }
    }
}
</script>

<style scoped>
#solver {
    height: calc(100vh - 70px);
    padding-left: 15px;
    padding-right: 10px;
}

#main {
    margin: 15px 0px !important;
    display: grid;
    align-items: center;
}

h1 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #232323;
}

.solver-content {
    height: calc(100% - 52px);
    display: grid;
    grid-template: 1fr min-content / 1fr;
}
</style>

<style>
.el-step__title {
    font-size: 18px !important;
}

.el-step__description {
    font-size: 14px !important;
}

.is-wait {
    color: #474748 !important;
}
</style>

