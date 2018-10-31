import { Radar } from 'vue-chartjs'




export default {
  extends: Radar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      
        labels: ["Holiday", "Meething", "Friends", "Prewedding", "Educationa", "Health", "Others"],
        datasets: [{
            label: "18-24",
            fill: true,
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "#6384FF",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#6384FF",
            data: [90.87,2.49,7.47,5.81,2.49,0.00,0.83]
        },{
            label: "25-34",
            fill: true,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(255,99,132,1)",
            data: [86.55,7.35,4.41,7.14,4.83,2.10,1.68]
            },{
              label: "35-44",
              fill: true,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "#84FF63",
              pointBorderColor: "#fff",
              pointBackgroundColor: "#84FF63",
              data: [92.25,7.36,4.65,1.94,1.16,1.55,1.16]
              },{
                label: "45-54",
                fill: true,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "#ed7207",
                pointBorderColor: "#fff",
                pointBackgroundColor: "#ed7207",
                data: [84.25,11.02,4.72,2.36,1.57,1.57,3.15]
                },{
                  label: "55-64",
                  fill: true,
                  backgroundColor: "rgba(255,99,132,0.2)",
                  borderColor: "#9c49f4",
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "#9c49f4",
                  data: [90.32,4.30,6.45,1.08,0.00,0.00,3.23]
                  }
        ]
      })
    }
  }