import { Bar } from 'vue-chartjs'


export default {
  
    extends: Bar,
    props: ['data', 'options'],
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
       
      
        label : this.data.labels,
        data : this.data.datasets
     
        ,options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
           
          
        
      })
    
    }
  }

  