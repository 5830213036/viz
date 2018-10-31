<template>
    <div>
        <h1>Vue-xlsx-table</h1>
        <p>Not need upload, view xlsx or xls file in your browser, Supported by js-xlsx.</p>
        <vue-xlsx-table @on-select-file="handleSelectedFile">
            Select one file
        </vue-xlsx-table>    
        <b-modal  v-model="modalShow" v-if="xlsdata"  title="If all right" @ok="handleOk">            
            <table  class="table">
                <thead >
                    <tr>
                        <td v-for="(head, index) in xlsdata.header" :key="index">{{head}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(body, index) in xlsdata.body" :key="index">
                        <td v-for="item in body" :key="item">{{item}}</td>
                    </tr>
                </tbody>
            </table>            
        </b-modal>   
      <div v-if="isdataOk">        
        <table class="table" >            
          <thead >
            <tr>
              <td v-for="(head, index) in xlsdata.header" :key="index">{{head}}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(body, index) in xlsdata.body" :key="index">
              <td v-for="item in body" :key="item">{{item}}</td>
            </tr>
          </tbody>
        </table>
        <b-form-group class="head mt-3" label="Select a Chart">
          <b-form-radio-group v-model="selected" :options="options"></b-form-radio-group>
        </b-form-group> 

        <div class="small">
          <line-chart v-if="selected == 'line'" :data="graphdata"></line-chart>
          <doughnut v-if="selected =='doughnut'" :data="graphdata"></doughnut>
          <pie v-if="selected =='pie'" :data="graphdata"></pie>
          <horizontal-bar v-if="selected =='horizontal'" :data="graphdata"></horizontal-bar>    
          <bargroup v-if="selected =='bargroup'" :data="graphdata" ></bargroup>  
        </div>
      </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import Bar from "../Chart/BarChart.js";
import LineChart from "../Chart/LineChart.js";
import Doughnut from "../Chart/DoughnutChart.js";
import Pie from "../Chart/PieChart.js";
import HorizontalBar from "../Chart/HorizontalChart.js";
import bargroup from "../Chart/BarChartGroup.js";

export default {
  name: "app",
  components: { LineChart, Doughnut, Pie, HorizontalBar, bargroup },

  data() {
    return {
      graphdata: {
        labels: [],
        datasets: []
      },
      xlsdata: null,
      modalShow: false,
      isdataOk: false,
      selected: null,
      options: [
        { text: "Line", value: "line" },
        { text: "Bar", value: "bar" },
        { text: "Doughnut", value: "doughnut" },
        { text: "Pie", value: "pie" },
        { text: "Horizontal", value: "horizontal" },
        { text: "Bar Group", value: "bargroup" }
      ]
    };
  },
  methods: {
    handleSelectedFile(convertedData) {
      console.log(convertedData);
      this.xlsdata = convertedData;
      //   window.alert(JSON.stringify(convertedData))
      this.modalShow = true;
    },

    // this.graphdata.labels = this.xlsdata.header
    //   for(var key in this.xlsdata.body[0]){
    //     this.graphdata.values.push(this.xlsdata.body[0][key])
    //   }
    handleOk() {
      console.log("handleOK");
      let graphheader = this.xlsdata.header.slice();
      let found = graphheader.indexOf("Title");
      if (found != -1) graphheader.splice(found, 1);
      this.graphdata.labels = graphheader;

      for (let index in this.xlsdata.body) {
        let body = this.xlsdata.body[index];

        let dataset = {
          label: [],
          data: [],
          fill: false,
          borderColor: [],
          backgroundColor: []
        };
        for (let item in body) {
          if (item == "Title") {
            dataset.label = body[item];
            dataset.backgroundColor = this.getcolors();
            dataset.borderColor = this.getcolors();
          } else {
            dataset.data.push(body[item]);
          }
        }
        this.graphdata.datasets.push(dataset);
      }

      this.isdataOk = true;
      // var label = Object.keys(this.xlsdata.body[0])
      //  for(let [item,index] in this.xlsdata.body){

      //    let data = {
      //       label : '' ,
      //       data : [],
      //       backgroundColor:[
      //         'rgba(255, 99, 132, 0.6)',
      //         'rgba(54, 162, 235, 0.6)',
      //         'rgba(255, 206, 86, 0.6)',
      //         'rgba(75, 192, 192, 0.6)',
      //         'rgba(153, 102, 255, 0.6)',
      //         'rgba(255, 159, 64, 0.6)',
      //         'rgba(132,255,99, 0.6)',
      //         ],
      //         borderWidth:1,
      //         borderColor:'#777',
      //         hoverBorderWidth:3,
      //         hoverBorderColor:'#000'
      //     }
      //     data.label = label[item]
      //     console.log(data.label)
      //    let currentItem = this.xlsdata.body[item]
      //     for (let key in currentItem) {
      //       data.data.push(currentItem[key])
      //    }
      //    console.log(data)
      //    this.graphdata.datasets.push(data)
      //  }
      //  console.log(this.graphdata.datasets)
      //   this.isdataOk=true;
      // -----------------------------------------------
      // db.collection("blogs")
      //   .add(this.xlsdata)
      //   .then(() => {
      //     console.log("added");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    getcolors() {
      let letters = "789ABCD".split("");
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 6)];
      }
      return color;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
h1,
h2,
h3 {
  font-weight: normal;
  margin: 0;
  padding: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.t-center {
  text-align: center;
  margin: 20px;
}
.mt150 {
  margin-top: 150px;
}
</style>