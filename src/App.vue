<template>
    <div class="app">
        <div class="nav" :class="{'active': menuActive}">
            <div class="logo">
                <img alt="Vue logo" src="./assets/logo.png">
            </div>
            <UploadData />
            <ul>
                <li @click="view = 'global'; menuActive=false">Global</li>
                <li @click="view = 'damages'; menuActive=false">Damages</li>
            </ul>
        </div>
        <div class="header">
            <div class="logo">
                <img alt="Vue logo" src="./assets/logo.png">
            </div>
            <BurgerButton class="burger" :active="menuActive" :toggle="toggleMenu"/>
        </div>
        <div class="container">
            <div class="content">            
                <GlobalLayout v-if="view == 'global'"/>
                <DamagesLayout v-if="view == 'damages'"/>
            </div>
        </div>
    </div>
</template>

<script>
import GlobalLayout from './layouts/Global.vue'
import DamagesLayout from './layouts/Damages.vue'
import UploadData from './components/UploadData.vue'
import BurgerButton from './components/BurgerButton.vue'
import '../public/style.scss'

export default {
    name: 'App',
    components: {
        GlobalLayout,
        DamagesLayout,
        UploadData,
        BurgerButton
    },
    data() {
        return {
            view: 'global',
            menuActive: false
        }
    },
    methods: {
        toggleMenu() {
            this.menuActive = !this.menuActive;
        }
    }
}
</script>

<style lang="scss">

</style>
