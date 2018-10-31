import { Bubble } from 'vue-chartjs'




export default {
  extends: Bubble,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      
        labels: "Africa",
        datasets: [
        {
          label: ["China"],
          backgroundColor: "rgba(255,221,50,0.2)",
          borderColor: "rgba(255,221,50,1)",
          data: [{
            x: 21269017,
            y: 5.245,
            r: 15
          }]
        }, {
          label: ["Denmark"],
          backgroundColor: "rgba(60,186,159,0.2)",
          borderColor: "rgba(60,186,159,1)",
          data: [{
            x: 4931877,
            y: 5.921,
            r: 15
          }]
        }
    ]
    })
    }
  }