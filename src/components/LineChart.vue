<template>
    <div class="chart">
        <Line
            :chart-data="chartData"
            :chart-options="chartOptions"
        />
        <input type="range" min="0" :max="max" v-model="start" @change="onChange">
        <input type="range" min="0" :max="max" v-model="end" @change="onChange">
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    labels: Object,
    datasets: Object,
    max: Number
  },
  data() {
    return {
            chartData: {
                labels: this.labels,
                datasets: this.datasets
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                },
            },
            start: 0,
            end: 0
        }
    },
    mounted() {
        this.start = 0;
        this.end = this.max;
        this.chartData.labels = this.labels;
        this.chartData.datasets = this.datasets;
    },
    updated() {
        
    },
    methods: {
        onChange() {
            this.chartData.labels = this.labels.slice(this.start, this.end);
            this.chartData.datasets = this.datasets.map(hunter => {
                return {
                    ...hunter,
                    data: hunter.data.slice(this.start, this.end)
                }
            });
        },
    },
    watch: {
        labels: function(newValue) {
            this.chartData.labels = newValue;
        },
        datasets: function(newValue) {
            this.chartData.datasets = newValue;
        },
        max: function(newValue) {
            this.end = newValue;
        }
    }
}
</script>

<style>
.chart {
    width: 100%;
}
</style>