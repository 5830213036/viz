import { Doughnut } from 'vue-chartjs'




export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      
      labels: this.data.labels,
      datasets: this.data.datasets,
        
          
      })
    }
  }