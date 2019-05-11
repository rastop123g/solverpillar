<template>
    <div id="select-climat">
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Ветровая нагрузка:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="Максимальная скорость ветра, м/с" v-model="result.wind" />
            </div>
        </div>
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Кф ветрового давления:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="зависит от местности" v-model="result.K_w" />
            </div>
        </div>
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Гололед:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="Номинальная толщина стенки гололеда" v-model="result.ice" />
            </div>
        </div>
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Кф гололедообразования:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="зависит от условий эксплуатации" v-model="result.K_ice" />
            </div>
        </div>
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Максимальная температура:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="В градусах цельсия" v-model="result.maxt" />
            </div>
        </div>
        <div class="formrow">
            <div class="grid-centering">
                <p class="form-label">Минимальная температура:</p>
            </div>
            <div class="grid-centering">
                <el-input placeholder="В градусах цельсия" v-model="result.mint" />
            </div>
        </div>
        <p v-if="isAll" style="margin:0; color: #F56C6C">Должны быть заполненны все поля</p>
        <el-button type="success" round @click="next">Продолжить <i class="el-icon-right"></i></el-button>
    </div>
</template>

<script>
import commFn from '../../commFn'
let toN = commFn.toN

export default {
    data () {
        return {
            result: {},
            isAll: false
        }
    },
    computed : {
    },
    methods: {
        next() {
            if(Object.keys(this.result).length < 6) {
                this.isAll = true
            } else {
            this.$store.commit('powerline/setClimat', this.validated(this.result))
            this.$emit('next')
            }
        },
        validated(obj) {
            return {
                wind: toN(obj.wind),
                K_w: toN(obj.K_w),
                ice: toN(obj.ice),
                K_ice: toN(obj.K_ice),
                maxt: toN(obj.maxt),
                mint: toN(obj.mint)
            }
        }
    }
}
</script>

<style scoped>
#select-climat {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    grid-gap: 15px;
}
</style>
