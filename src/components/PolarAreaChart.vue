<template>
    <div class="chart">
        <PolarArea
            :chart-data="chartData"
            :chart-options="chartOptions"
        />
    </div>
</template>

<script>
import { PolarArea } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

export default {
  name: 'PolarAreaChart',
  components: { PolarArea },
  props: {
    labels: Object,
    datasets: Object
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
            }
        }
    },
    mounted() {
        this.chartData.labels = this.labels;
        this.chartData.datasets = this.datasets;
    },
    methods: {

    },
    watch: {
        labels: function(newValue) {
            this.chartData.labels = newValue;
        },
        datasets: function(newValue) {
            this.chartData.datasets = newValue;
        }
    }
}
</script>

<style>
.chart {
    width: 50%;
}
</style>