<template>
    <div class="app">
        <div class="nav">
            <div class="logo">
                <img alt="Vue logo" src="./assets/logo.png">
            </div>
            <UploadData />
            <ul>
                <li @click="view = 'global'">Global</li>
                <li @click="view = 'damages'">Damages</li>
            </ul>
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
import '../public/style.scss'

export default {
    name: 'App',
    components: {
        GlobalLayout,
        DamagesLayout,
        UploadData
    },
    data() {
        return {
            view: 'global'
        }
    },
}
</script>

<style lang="scss">

</style>
