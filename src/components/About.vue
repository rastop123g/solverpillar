<template>
    <div class="about">
        <div class="abcont">
            <div>
            </div>
            <div id="inf">
                <div>
            <h1>SolverPillar</h1>
            <p>Версия: {{version}}</p>
            <p>Автор: Растопчин А.С.</p>
            <p>Руководитель: Абдюкаева А.Ф.</p>
            <p>Email: rastop123g@gmail.com</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
const appVersion = window.require('electron').remote.app.getVersion()

export default {
    data () {
        return {
            version: ''
        }
    },
    mounted () {
        this.version = appVersion;
    }
}
</script>

<style scoped>
.about {
    height: calc(100vh - 60px);
    display: grid;
    justify-items : center;
    align-items: center;
}

#inf {
    height: calc(100% - 33px);
    display: grid;
    align-items: center;
}

.abcont {
    width: 350px;
    height: 200px;
}

p, h1 {
    text-align: center
}
</style>
