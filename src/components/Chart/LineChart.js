import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    
    this.renderChart({
      labels: this.data.labels,
      datasets: this.data.datasets
      
      ,options:{
      title: {
        display: true,
        text: "Relationship between purpose and nationality",
        fontSize:25,
        position:"top"
      }
    }
  })
    
  }
}
