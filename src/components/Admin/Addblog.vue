<template>
  <div>
    <b-navbar toggleable="md" type="dark" class="navbar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link :to="{ name :'Overviews'}">
        <b-navbar-brand>PTEI Visualization</b-navbar-brand>
      </router-link>
      <!-- Right aligned nav items -->
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button size="sm" class="button" type="submit" @click="signout()">
              <span>Sign Out</span>
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Start Create blog -->
    <b-card class="card">
      <h2 class="mb-4">Create a New Blog</h2>
      <vue-good-wizard :steps="steps" :onNext="nextClicked" :onBack="backClicked">
        <div slot="page1">
          <!-- image -->
          <div class="mt-3">
            <img
              :src="imagepreview"
              class="preview-image"
              width="450"
              height="300"
              v-on:click="openupload"
              alt="Responsive image"
            >
            <div class="browse">
              <b-form-file
                class="mt-3"
                type="file"
                name="image"
                id="file-filed"
                v-model="imagepreview"
                v-on:change="updatepreview"
              ></b-form-file>
            </div>
          </div>

          <div class="container">
            <label class="label">
              <b>Title :</b>
            </label>
            <b-form-input class="input" type="text" v-model="title" required placeholder="Title..."></b-form-input>

            <label class="label mt-4">
              <b>Description :</b>
            </label>
            <b-form-textarea
              class="textarea"
              type="text"
              id="description"
              v-model="description"
              placeholder="Description..."
              :rows="3"
              :max-rows="6"
            ></b-form-textarea>
          </div>
        </div>

        <div slot="page2">
          <!-- chart -->
          <div>
            <h3>Import Your Data</h3>
            <vue-xlsx-table @on-select-file="handleSelectedFile">Import Your Data</vue-xlsx-table>
            <!-- <button @click="reset()">reset</button> -->
            <b-modal
              v-model="modalShow"
              v-if="xlsdata"
              size="lg"
              title="If all right"
              @ok="handleOk"
            >
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
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
              </div>
            </b-modal>

            <div v-if="isdataOk">
              <div class="table-responsive mt-5">
                <table class="table table-bordered table-striped">
                  <thead>
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
              </div>
              <section>
                <section>
                  <div></div>
                </section>
                <b-form-group class="mt-3" label="Select a Chart"></b-form-group>
                <div>
                  <b-row class="row-chart">
                    <!-- <b-card-group> -->
                    <div class="col-4">
                      <input type="radio" id="bargroup" value="bargroup" v-model="selected">
                      <label for="bargroup">
                        <b-card class="box">
                          <img src="../../assets/bar.png" width="80">
                          <p>Bar Chart</p>
                        </b-card>
                      </label>
                    </div>

                    <div class="col-4">
                      <input type="radio" id="line" value="line" v-model="selected">
                      <label for="line">
                        <b-card class="box">
                          <img src="../../assets/line.png" width="80">
                          <p>Line Chart</p>
                        </b-card>
                      </label>
                    </div>

                    <div class="col-4">
                      <input type="radio" id="doughnut" value="doughnut" v-model="selected">
                      <label for="doughnut">
                        <b-card class="box">
                          <img src="../../assets/doughnut.png" width="80">
                          <p>Doughnut Chart</p>
                        </b-card>
                      </label>
                    </div>

                    <div class="col-4">
                      <input type="radio" id="pie" value="pie" v-model="selected">
                      <label for="pie">
                        <b-card class="box">
                          <img src="../../assets/pie.png" width="80">
                          <p>Pie Chart</p>
                        </b-card>
                      </label>
                    </div>

                    <div class="col-4">
                      <input type="radio" id="horizontal" value="horizontal" v-model="selected">
                      <label for="horizontal">
                        <b-card class="box">
                          <img src="../../assets/horizon.png" width="80">
                          <p>Horizontal Chart</p>
                        </b-card>
                      </label>
                    </div>

                    <!-- <div class="col-4">
                      <input type="radio" id="bubble" value="bubble" v-model="selected">
                      <label for="bubble">
                        <b-card class="box">
                          <img src="../../assets/bubble.png" width="80">
                          <p>Bubble Chart</p>
                        </b-card>
                      </label>
                    </div> -->
                    <!-- </b-card-group> -->
                  </b-row>
                </div>
              </section>
              <section>
                <div class="small">
                  <line-chart v-if="selected == 'line'" :data="graphdata"></line-chart>
                  <doughnut v-if="selected =='doughnut'" :data="graphdata"></doughnut>
                  <pie v-if="selected =='pie'" :data="graphdata"></pie>
                  <horizontal-bar v-if="selected =='horizontal'" :data="graphdata"></horizontal-bar>
                  <bargroup v-if="selected =='bargroup'" :data="graphdata"></bargroup>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div slot="page3">
          <section>
            <div class="mb-3">
              <img
                :src="imagepreview"
                class="preview-image"
                width="450"
                height="300"
                v-on:click="openupload"
                alt="Responsive image"
              >
            </div>
          </section>
          <b-media>
            <b-media-body class="ml-3">
              <h3 class="mt-4">{{title}}</h3>

              <div class="row">
                <h5 class="des mt-3">{{description}}</h5>
              </div>
            </b-media-body>
          </b-media>
          <div class="small">
            <line-chart v-if="selected == 'line'" :data="graphdata"></line-chart>
            <doughnut v-if="selected =='doughnut'" :data="graphdata"></doughnut>
            <pie v-if="selected =='pie'" :data="graphdata"></pie>
            <horizontal-bar v-if="selected =='horizontal'" :data="graphdata"></horizontal-bar>
            <bargroup v-if="selected =='bargroup'" :data="graphdata"></bargroup>
          </div>
          <!-- submit -->
          <!-- <div class="add">
          <b-button variant="success" v-model="time" v-on:click="Addblog()" >Confirm</b-button>
          <router-link :to="{ name : 'Overviews'}" >
          <b-button variant="danger">Cancel</b-button>
          </router-link>
          </div>-->
        </div>
      </vue-good-wizard>
    </b-card>
    <Footer/>
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
      time: moment().format("MM/DD/YYYY hh:mm:ss"),
      imagepreview: require("../../assets/Upload.png"),
      file: true,
      description: null,
      slug: null,
      title: null,
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
        { text: "Doughnut", value: "doughnut" },
        { text: "Pie", value: "pie" },
        { text: "Horizontal", value: "horizontal" },
        { text: "Bar Group", value: "bargroup" }
      ],
      steps: [
        {
          label: "Add Data",
          slot: "page1"
        },
        {
          label: "Import Data",
          slot: "page2"
        },
        {
          label: "Preview",
          slot: "page3"
        }
      ],
      
    };
  },
  methods: {
    // Addblog() {
    //create a slug
    // this.slug = slugify(this.title, {
    //   replacement: "-",
    //   remove: /[$*_+~.()'"!\-;@]/g,
    //   lower: true
    // });
    // for(let item in this.savedata.datasets){
    //   this.savedata.datasets[item]._meta = null
    // }
    //   for (let item in this.graphdata.datasets) {
    //     this.graphdata.datasets[item]._meta = null;
    //   }
    //   console.log(this.graphdata);
    //   let ref = db.collection("blogs");
    //   ref
    //     .add({
    //       graphdata: this.graphdata,
    //       time: this.time,
    //       imagepreview: this.imagepreview,
    //       title: this.title,
    //       description: this.description,
    //       selected: this.selected,
    //       slug: this.slug
    //     })
    //     .then(() => {
    //       // this.$router.push({ name : 'Overviews '})
    //       this.$router.replace({ name: "Overviews" });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
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
        fill: false,
        backgroundColor:[]
      }
      // for (let item in this.dataset) {
      //     this.dataset[item]._meta = null;
      //   }
      // this.dataset = [dataset];
            // let obg = Object.create(dataset);
            console.log(this.dataset)
           dataset.backgroundColor = ["#E74C3C","#5DADE2","#DC7633","#2ECC71","#138D75","#F5B041","#A9CCE3",
           "#B03A2E","#4A235A","#F5B7B1","#A9DFBF"]
           dataset.borderColor = '#000000'
        for (let item in body) {
          if (item == "Title") {
            dataset.label = body[item];
          } else {
            dataset.data.push(body[item]);
          }
        }
        // let obg = [];
        // obg.push(dataset);
        // console.log(obg)
        // console.log(index)
        this.graphdata.datasets.push(dataset);
      }
      // console.log(this.dataset.length)
      this.isdataOk = true;
      // this.savedata.datasets = this.graphdata.datasets.slice();
      // this.savedata.labels = this.graphdata.labels.slice();
      // console.log(this.savedata)
    },
    getcolors() {
      let letters = "FABCD36".split("");
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 6)];
      }
      return color;
    },
    nextClicked(currentPage) {
      if (currentPage == 2) {
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-;@]/g,
          lower: true
        });
        // for(let item in this.savedata.datasets){
        //   this.savedata.datasets[item]._meta = null
        // }
        for (let item in this.graphdata.datasets) {
          this.graphdata.datasets[item]._meta = null;
        }
        console.log(this.graphdata);
        let ref = db.collection("blogs");
        ref
          .add({
            graphdata: this.graphdata,
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
      }
      console.log("next clicked", currentPage);
      return true; //return false if you want to prevent moving to next page
    },
    backClicked(currentPage) {
      console.log("back clicked", currentPage);
      return true; //return false if you want to prevent moving to previous page
    },
    reset () {
    Object.assign(this.$data, this.$options.data());
    console.log('reset')
    }
  }
};
</script>

<!-- form-file.vue -->

<style scoped>
.navbar {
  background: linear-gradient(#0bc0b1 20%, #eaeaec);
  /* background:#e66465; */
  border: 5px;
  border-color: #ccc;
  width: 100%;
}

.card {
  text-align: center;
  max-width: auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
}

.btn {
  margin: 5px;
}

.small {
  max-width: 60%;
  margin: 100px auto;
  margin-top: 4%;
}

.input {
  width: 50%;
  border-radius: 15px;
  padding: 5px 20px;
}

.textarea {
  height: 200px;
  border-radius: 20px;
  padding: 5px 20px;
  margin: auto;
}

.container {
  text-align: left;
  padding: 40px;
}

.box {
  font-size: 15px;
  text-align: center;
  width: 150px;
  height: 130px;
  margin: 10px;
}

.des {
  text-align: justify;
  text-indent: 50px;
  line-height: normal;
  margin-left: 80px;
  margin-right: 80px;
}

.radio-component {
  border-color: #4d82ff;
  /* background: #849edb; */
}

.button {
  display: inline-block;
  border-radius: 10px;
  background-color: #faf9f9;
  color: rgb(41, 39, 39);
  border: none;
  text-align: center;
  font-size: 15px;
  padding: 0px;
  width: 90px;
  height: 30px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-top: 10px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

.browse {
  margin: auto;
  width: 60%;
}

.table-responsive {
  border-collapse: collapse;
  font-size: 15px;
  table-layout: fixed;
  margin-top: 10px;
}
</style>
