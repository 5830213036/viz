import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.data.labels,
      datasets: this.data.datasets
      
      ,
      options: {
        title: {
          display: true,
          text: 'Population growth (millions)'
        }
      }
    })
  }
}