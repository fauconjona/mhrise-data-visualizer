<template>
    <LineChart v-if="hasData" :labels="totalDamages.labels" :datasets="totalDamages.datasets" :max="max"/>
    <div v-if="hasData" class="row">
        <RadarChart :labels="globalDamages.labels" :datasets="globalDamages.datasets"/>
        <StackBarChart :labels="hits.labels" :datasets="hits.datasets"/>
    </div>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import RadarChart from '../components/RadarChart.vue'
import StackBarChart from '../components/StackBarChart.vue'
import getDataService from '../services/DataService.js'

const DataService = getDataService();

export default {
    name: 'GlobalLayout',
    components: {
        LineChart,
        RadarChart,
        StackBarChart
    },
    data() {
        return {
            max: 0,
            hasData: false,
            totalDamages: {labels: [], datasets: []},
            globalDamages: {labels: [], datasets: []},
            hits: {labels: [], datasets: []},
        }
    },
    mounted() {
        this.loadData();
        this.hasData = DataService.hasData();
        this.max = DataService.getDataEnd();
        DataService.subjectData.subscribe({
            next: () => {
                this.loadData();
                this.hasData = DataService.hasData();
                this.max = DataService.getDataEnd();
            }
        })
    },
    methods: {
        loadData() {
            let damageFactory = DataService.getDamageFactory();
            if (damageFactory != null) {
                this.totalDamages = damageFactory.getTotalDamages();
                this.globalDamages = damageFactory.getGlobalDamages();
                this.hits = damageFactory.getHits();
            } else {
                this.totalDamages = {labels: [], datasets: []};
                this.globalDamages = {labels: [], datasets: []};
                this.hits = {labels: [], datasets: []};
            }
        }
    }
}
</script>