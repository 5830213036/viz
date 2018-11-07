import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
    this.renderChart({
      labels: this.data.labels,
      datasets: this.data.datasets,
      backgroundColor: ['#C28535', '#8AAE56', '#B66C46']
    })
  }
}