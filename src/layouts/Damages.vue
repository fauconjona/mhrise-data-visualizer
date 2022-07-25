<template>
    <div class="row">
        <LineChart v-if="hasData" :labels="totalDamages.labels" :datasets="totalDamages.datasets" :max="max"/>
        <LineChart v-if="hasData" :labels="basePhysicalDamages.labels" :datasets="basePhysicalDamages.datasets" :max="max"/>
    </div>
    <div class="row">
        <BarChart v-if="hasData" :labels="physicalRates.labels" :datasets="physicalRates.datasets" :stacked="false"/>
        <BarChart v-if="hasData" :labels="baseDps.labels" :datasets="baseDps.datasets" :stacked="false"/>
        <BarChart v-if="hasData" :labels="efficiency.labels" :datasets="efficiency.datasets" :stacked="false"/>
    </div>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import getDataService from '../services/DataService.js'

const DataService = getDataService();

export default {
    name: 'DamagesLayout',
    components: {
        LineChart,
        BarChart
    },
    data() {
        return {
            max: 0,
            hasData: false,
            totalDamages: {labels: [], datasets: []},
            basePhysicalDamages: {labels: [], datasets: []},
            physicalRates: {labels: [], datasets: []},
            baseDps: {labels: [], datasets: []},
            efficiency: {labels: [], datasets: []},
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
                this.basePhysicalDamages = damageFactory.getPhysicalBaseDamages();
                this.physicalRates = damageFactory.getPhysicalRates();
                this.baseDps = damageFactory.getBaseDps();
                this.efficiency = damageFactory.getEfficiency();
            } else {
                this.totalDamages = {labels: [], datasets: []};
                this.basePhysicalDamages = {labels: [], datasets: []};
                this.physicalRates = {labels: [], datasets: []};
                this.baseDps = {labels: [], datasets: []};
                this.efficiency = {labels: [], datasets: []};
            }
        }
    }
}
</script>