<template>
    <div class="chart">
        <Bar
            :chart-data="chartData"
            :chart-options="chartOptions"
        />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    labels: Object,
    datasets: Object,
    stacked: Boolean
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
                scales: {
                    x: {
                        stacked: this.stacked
                    },
                    y: {
                        stacked: this.stacked
                    }
                }
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