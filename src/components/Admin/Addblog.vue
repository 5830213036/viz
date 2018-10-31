<template>
  <div>
    <b-card class="card mb-3">
      <h2 class="add">Create a New Blog</h2>

    
<!-- image -->
      <div class="add mt-3">  
        <img :src="imagepreview" class="preview-image" v-on:click="openupload" alt="Responsive image" />
        <b-form-file class="mt-3" type="file" name="image" id="file-filed"  v-on:change="updatepreview"></b-form-file>
      </div>

      <label class="head mt-3">Title </label>
        <b-form-input   class="input"    
                        type="text"
                        v-model="title"
                        required
                        placeholder="Enter Title">
        </b-form-input>

      <label class="head mt-3">Description </label>
        <b-form-textarea  class="input"
                          type="text"
                      id="description"
                      v-model="description"
                      placeholder="Enter Description"
                      :rows="3"
                      :max-rows="6">
        </b-form-textarea>
  


   
      


   <!-- chart -->
      <div>
        <h1>Vue-xlsx-table</h1>
        <p>Not need upload, view xlsx or xls file in your browser, Supported by js-xlsx.</p>
        <vue-xlsx-table @on-select-file="handleSelectedFile" class="add"> Import Your Data </vue-xlsx-table>    
        <b-modal  v-model="modalShow" v-if="xlsdata"  title="If all right" @ok="handleOk">            
            <table  class="table table-bordered">
                <thead >
                    <tr>
                        <th v-for="(head, index) in xlsdata.header" :key="index">{{head}}</th>
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
        <table class="table table-bordered mt-3" >            
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
        <b-form-group class="head mt-3" label="Select a Chart"></b-form-group> 


<section>
  <div class="radio-component">
  <b-row >
  <!-- <b-card-group> -->
  <b-col>
    <input type="radio" id="bargroup" value="bargroup" v-model="selected">
      <label for="bargroup">
        <b-card class="box"> 
          <img src="../../assets/bar.png" width="80"/>
          <p>Bar Chart</p>
        </b-card>
      </label>
  </b-col>
  <b-col>
    <input type="radio" id="line" value="line" v-model="selected">
      <label for="line">
        <b-card class="box"> 
          <img src="../../assets/line.png" width="80"/>
          <p>Line Chart</p>
        </b-card>
      </label>
  </b-col> 

  <b-col>
    <input type="radio" id="doughnut" value="doughnut" v-model="selected">
      <label for="doughnut">
        <b-card class="box"> 
          <img src="../../assets/doughnut.png" width="80"/>
          <p>Doughnut Chart</p>
        </b-card>
      </label>
  </b-col>

  <b-col>
    <input type="radio" id="pie" value="pie" v-model="selected">
      <label for="pie">
        <b-card class="box"> 
          <img src="../../assets/pie.png" width="80"/>
          <p>Pie Chart</p>
        </b-card>
      </label>
  </b-col>

  <b-col>
    <input type="radio" id="horizontal" value="horizontal" v-model="selected">
      <label for="horizontal">
        <b-card class="box"> 
          <img src="../../assets/horizon.png" width="80"/>
          <p>Horizontal Chart</p>
        </b-card>
      </label>
  </b-col>

  <b-col>
    <input type="radio" id="bubble" value="bubble" v-model="selected">
      <label for="bubble">
        <b-card class="box"> 
          <img src="../../assets/bubble.png" width="80"/>
          <p>Bubble Chart</p>
        </b-card>
      </label>
  </b-col>  
  <!-- </b-card-group> -->
  </b-row>
  </div>
</section>

 <div class="small">
    <line-chart v-if="selected == 'line'" :data="graphdata"></line-chart>
    <doughnut v-if="selected =='doughnut'" :data="graphdata"></doughnut>
    <pie v-if="selected =='pie'" :data="graphdata" ></pie>
    <horizontal-bar v-if="selected =='horizontal'" :data="graphdata"></horizontal-bar>    
    <bargroup v-if="selected =='bargroup'" :data="graphdata" ></bargroup>  
  </div>

      </div>
    </div>

  <!-- submit -->
      <div class="add">
        <b-button variant="success" v-model="time" v-on:click="Addblog()" >Confirm</b-button>
      <!-- <router-link :to="{name : 'Overviews'}"><b-button v-on:click="Addblog()" >Confirm</b-button></router-link> -->
        <router-link :to="{ name : 'Overviews'}" >
          <b-button variant="danger">Cancel</b-button>
        </router-link>
      </div>



    </b-card>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import bargroup from "../Chart/BarChartGroup.js";
import LineChart from "../Chart/LineChart.js";
import Doughnut from "../Chart/DoughnutChart.js";
import Pie from "../Chart/PieChart.js";
import HorizontalBar from "../Chart/HorizontalChart.js";
import moment from "moment";

export default {
  name: "Addblog",
  components: { bargroup, LineChart, Doughnut, Pie, HorizontalBar },

  data() {
    return {
      time: moment().format("MM/DD/YYYY hh:mm"),
      imagepreview: require("../../assets/Upload.png"),
      file: null,
      description: null,
      slug: null,
      title: null,
      // savedata : {
      //   labels : [],
      //   datasets : []
      // },
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
    Addblog() {
      //create a slug
      this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-;@]/g,
        lower: true
      });
      // for(let item in this.savedata.datasets){
      //   this.savedata.datasets[item]._meta = null
      // }
      for(let item in this.graphdata.datasets){
      this.graphdata.datasets[item]._meta = null
      }
      console.log(this.graphdata)
      let ref = db.collection("blogs")
        ref.add({
          graphdata : this.graphdata,
          time: this.time,
          imagepreview: this.imagepreview,
          title: this.title,
          description: this.description,
          selected: this.selected,
          slug: this.slug
        })
        .then(() => {
          // this.$router.push({ name : 'Overviews '})
          this.$router.replace({ name: "Overviews" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    openupload() {
      document.getElementById("file-filed").click();
    },

    updatepreview(e) {
      var reader,
        files = e.target.files;
      if (files.length == 0) {
        console.log("empty");
      }
      reader = new FileReader();
      reader.onload = e => {
        this.imagepreview = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    handleSelectedFile(convertedData) {
      console.log(convertedData);
      this.xlsdata = convertedData;
      //   window.alert(JSON.stringify(convertedData))
      this.modalShow = true;
    },
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
          fill : false,
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
      // this.savedata.datasets = this.graphdata.datasets.slice();
      // this.savedata.labels = this.graphdata.labels.slice();
      // console.log(this.savedata)
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

<!-- form-file.vue -->

<style scoped>
.btn {
  margin: 5px;
}
.small {
  max-width: 600px;
  margin: 100px auto;
}
.add {
  text-align: center;
  font-family: "Proxima Nova Soft", "Helvetica Neue", sans-serif;
}
.head {
  color: rgb(223, 128, 223);
  font-family: Tw Cen MT;
  font-size: 20px;
}

.input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
  font-family: Tw Cen MT;
}
.box {
  font-size: 15px;
  text-align: center;
  width: 170px;
  height: 150px;
  margin: 10px;
}
.card-group {
  text-align: center;
  max-width: 800px auto;
  margin-top: 30px;
  margin-right: 5px;
  margin-left: 200px;
}
.radio-component {
  border-color: #4d82ff;
  /* background: #849edb; */
}
</style>
