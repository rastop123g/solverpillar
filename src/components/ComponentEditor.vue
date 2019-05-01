<template>
    <div class="component-editor">
        <h1>Редактор компонентов</h1>
        <div class="divtabs">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane class="tab-size" label="Опоры" name="pillar">
                <edit-pillar />
            </el-tab-pane>
            <el-tab-pane class="tab-size" label="Провода" name="wire">
                <edit-wire />
            </el-tab-pane>
            <el-tab-pane class="tab-size" label="Изоляторы" name="isolator">
                <edit-isolator />
            </el-tab-pane>
            <el-tab-pane class="tab-size" label="Траверсы" name="traversa">
                <edit-traversa />
            </el-tab-pane>
        </el-tabs>
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
            activeTab: 'pillar',
        }
    },
    methods: {
        handleClick(tab, event) {
            //console.log(tab, event);
        }
    },
    components: {
        EditPillar,
        EditWire,
        EditIsolator,
        EditTraversa
    },
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
</style>
