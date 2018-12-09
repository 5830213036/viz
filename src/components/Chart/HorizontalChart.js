import { HorizontalBar } from 'vue-chartjs'


export default {
  
    extends: HorizontalBar,
    props: ['data', 'options'],
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
      labels: this.data.labels,
      datasets: this.data.datasets,
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }  
      })
    }
}
  