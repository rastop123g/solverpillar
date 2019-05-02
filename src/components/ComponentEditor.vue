<template>
    <div class="component-editor">
        <h1>Редактор компонентов</h1>
        <div class="divtabs">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="GoTo('EditPillar')">Опоры</el-menu-item>
            <el-menu-item index="2" @click="GoTo('EditWire')">Провода</el-menu-item>
            <el-menu-item index="3" @click="GoTo('EditIsolator')">Изоляторы</el-menu-item>
            <el-menu-item index="4" @click="GoTo('EditTraversa')">Траверсы</el-menu-item>
        </el-menu>
        <div class="spacer"></div>
        <transition name="fade" mode="out-in" appear>
        <component :is="componentId"></component>
        </transition>
        </div>
    </div>
</template>

<script>
import EditPillar from './EditorContent/EditPillar'
import EditWire from './EditorContent/EditWire'
import EditIsolator from './EditorContent/EditIsolator'
import EditTraversa from './EditorContent/EditTraversa'

export default {
    data () {
        return {
            activeIndex: '1',
            componentId: ''
        }
    },
    methods: {
        GoTo (comp) {
            this.componentId = comp
        }
    },
    components: {
        EditPillar,
        EditWire,
        EditIsolator,
        EditTraversa
    },
    mounted () {
        this.GoTo('EditPillar')
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

.divtabs {
    padding-left: 15px;
    padding-right: 15px;
}

.spacer {
    height: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

<style>
.el-tabs__active-bar {
    background-color: #128656 !important;
}

.el-tabs__item.is-active {
    color: #232323 !important;
}

.el-tabs__item:hover {
    color: #232323 !important;
}

.el-tabs__item {
    font-size: 13pt !important;
}

.el-menu--horizontal>.el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    font-size: 16px !important;
    color:#232323 !important;
}
</style>
