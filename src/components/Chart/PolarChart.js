import { PolarArea } from 'vue-chartjs'




export default {
  extends: PolarArea,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      
        labels: ['Chinese', 'Australian and New Zealanders', 'Russian', 'Thai', 'Other Asians', 'Other Europeans'],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#e29d68", "#94e268","#e17ae2","#68e2dd","#dbe279","#e8241e"],
            data: [292,158,204,202,143,154]
        }
        ]
      })
    }
  }