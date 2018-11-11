<template>
    <div class="edit-blog">
        <b-navbar toggleable="md" type="dark"  class="navbar">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <router-link :to="{ name :'Overviews'}">
                <b-navbar-brand>PTEI Visualization</b-navbar-brand>
            </router-link>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button size="sm" class="button" type="submit" @click="signout()"><span>Sign Out</span></b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
    </b-navbar>
<!-- Start Edit blog -->
    <b-card  v-if="blog" class="card">
         <h2 class="mb-4">Edit : {{blog.title}}</h2>
            <vue-good-wizard 
                :steps="steps"
                :onNext="nextClicked" 
                :onBack="backClicked">
<div slot="page1">
    <div class="mt-3">  
        <img :src="blog.imagepreview" class="preview-image" width="450"  height="300" v-on:click="openupload" alt="Responsive image" />
            <div class="browse">
                <b-form-file class="mt-3" type="file" name="image" id="file-filed" v-on:change="updatepreview"></b-form-file>
            </div>
    </div>
    <div class="container">
        <label class="label"><b>Title : </b></label>
            <b-form-input   class="input"
                            type="text"
                            v-model="blog.title"
                            required
                            placeholder="Enter Title">
            </b-form-input>
            <label class="label mt-4"><b>Description : </b></label>
            <b-form-textarea    class="textarea"
                                type="text"
                                id="description"
                                v-model="blog.description"
                                placeholder="Enter Description"
                                :rows="3"
                                :max-rows="6">
            </b-form-textarea>
    </div>
</div>
<!-- select a chart -->
<div slot="page2">
    <section>   
        <b-form-group class="mt-3" label="Select a Chart"></b-form-group> 
            <div >
                <b-row class="row-chart">
                    <div class="col-4">
                        <input type="radio" id="bargroup" value="bargroup" v-model="blog.selected">
                            <label for="bargroup">
                                <b-card class="box"> 
                                    <img src="../../assets/bar.png" width="80"/>
                                        <p>Bar Chart</p>
                                </b-card>
                            </label>
                    </div>
                    <div class="col-4">
                        <input type="radio" id="line" value="line" v-model="blog.selected">
                            <label for="line">
                                <b-card class="box"> 
                                    <img src="../../assets/line.png" width="80"/>
                                        <p>Line Chart</p>
                                </b-card>
                            </label>
                    </div> 
                    <div class="col-4">
                        <input type="radio" id="doughnut" value="doughnut" v-model="blog.selected">
                            <label for="doughnut">
                                <b-card class="box"> 
                                    <img src="../../assets/doughnut.png" width="80"/>
                                        <p>Doughnut Chart</p>
                                </b-card>
                            </label>
                    </div>
                    <div class="col-4">
                        <input type="radio" id="pie" value="pie" v-model="blog.selected">
                            <label for="pie">
                                <b-card class="box"> 
                                    <img src="../../assets/pie.png" width="80"/>
                                        <p>Pie Chart</p>
                                </b-card>
                            </label>
                    </div>
                    <div class="col-4">
                        <input type="radio" id="horizontal" value="horizontal" v-model="blog.selected">
                            <label for="horizontal">
                                <b-card class="box"> 
                                    <img src="../../assets/horizon.png" width="80"/>
                                        <p>Horizontal Chart</p>
                                </b-card>
                            </label>
                    </div>
                </b-row>
            </div>
    </section>
    <section>
        <div class="small">
            <bargroup v-if="blog.selected == 'bargroup'" :data="blog.graphdata"></bargroup>
            <line-chart v-if="blog.selected == 'line'" :data="blog.graphdata"></line-chart>
            <doughnut v-if="blog.selected =='doughnut'" :data="blog.graphdata"></doughnut>
            <pie v-if="blog.selected =='pie'" :data="blog.graphdata"></pie>
            <HorizontalBar v-if="blog.selected =='horizontal'" :data="blog.graphdata"></HorizontalBar>
        </div>
    </section>   
</div>
<div slot="page3"> 
    <section>
      <div class="mb-3">
        <img :src="blog.imagepreview" class="preview-image" width="600" height="450" v-on:click="openupload" alt="Responsive image" />
      </div>
    </section>
    <!-- <section>
      <i class="post-meta">{{ blog.time}}</i>
    </section> -->
    <section>
      <h3 class="mt-4">{{blog.title}}</h3>
    </section>

    <div class="row">
      <h5  class="des mt-3">
        {{blog.description}}
      </h5>
    </div>

    <div class="small">
        <bargroup v-if="blog.selected == 'bargroup'" :data="blog.graphdata"></bargroup>
        <line-chart v-if="blog.selected == 'line'" :data="blog.graphdata"></line-chart>
        <doughnut v-if="blog.selected =='doughnut'" :data="blog.graphdata"></doughnut>
        <pie v-if="blog.selected =='pie'" :data="blog.graphdata"></pie>
        <HorizontalBar v-if="blog.selected =='horizontal'" :data="blog.graphdata"></HorizontalBar>
    </div>    
  <!-- submit -->
      <!-- <div class="add">
        <b-button variant="success" v-model="time" v-on:click="Addblog()" >Confirm</b-button>
        <router-link :to="{ name : 'Overviews'}" >
          <b-button variant="danger">Cancel</b-button>
        </router-link>
      </div> -->
</div> 
  <!-- submit -->
            <!-- <div class="add">
                <router-link :to="{ name : 'Overviews'}">
                    <b-button variant="success" :v-model="blog.time" v-on:click="Editblog()" >Update</b-button>
                </router-link>
                <router-link :to="{ name : 'Overviews'}">
                    <b-button variant="danger">Cancel</b-button>
                </router-link>
            </div> -->
            </vue-good-wizard>
        </b-card>
    </div>
</template>

<script>
import db from "@/firebase/init";
import bargroup from "../Chart/BarChartGroup.js";
import LineChart from "../Chart/LineChart.js";
import Doughnut from "../Chart/DoughnutChart.js";
import Pie from "../Chart/PieChart.js";
import HorizontalBar from "../Chart/HorizontalChart.js";
import slugify from "slugify";
import moment from "moment";

export default {
  name: "Editblog",
  components: { bargroup, LineChart, Doughnut, Pie, HorizontalBar },
  data() {
    return {
      blog: [],
      graphdata: {
        labels: [],
        datasets: []
      },
      time: moment().format("MM/DD/YYYY hh:mm"),
      slug: null,
      options: [
        { text: "Line", value: "line" },
        { text: "Bar", value: "bar" },
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
      ]
    };
  },
  created() {
    let ref = db
      .collection("blogs")
      .where("slug", "==", this.$route.params.edit_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.data())
        this.blog = doc.data();
        this.blog.id = doc.id;
      });
    });
  },
  methods: {
    // Editblog() {
    //   this.slug = slugify(this.blog.title, {
    //     replacement: "-",
    //     remove: /[$*_+~.()'"!\-;@]/g,
    //     lower: true
    //   });
    //   db.collection("blogs")
    //     .doc(this.blog.id)
    //     .update({
    //       title: this.blog.title,
    //       description: this.blog.description,
    //       selected: this.blog.selected,
    //       imagepreview: this.blog.imagepreview,
    //       slug: this.slug,
    //       time: this.blog.time
    //     })
    //     .then(() => {
    //       // this.$router.push({name : 'Navbar'})
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
        this.blog.imagepreview = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    nextClicked(currentPage) {
      if (currentPage == 2) {
        this.slug = slugify(this.blog.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-;@]/g,
          lower: true
        });
        // for(let item in this.savedata.datasets){
        //   this.savedata.datasets[item]._meta = null
        // }
        for (let item in this.blog.graphdata.datasets) {
          this.blog.graphdata.datasets[item]._meta = null;
        }
        console.log(this.blog.graphdata);
        db.collection("blogs")
          .doc(this.blog.id)
          .update({
            graphdata: this.blog.graphdata,
            time: this.time,
            imagepreview: this.blog.imagepreview,
            title: this.blog.title,
            description: this.blog.description,
            selected: this.blog.selected,
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
    }
  }
};
</script>

<style scoped>
.card {
  text-align: center;
  max-width: auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
  margin-bottom: 40px;
}

.navbar {
  background: linear-gradient(#e66465, #b0b5f0);
  /* background:#e66465; */
  border: 5px;
  border-color: #ccc;
  width: 100%;
}

.button {
  display: inline-block;
  border-radius: 10px;
  background-color: #dfcfd7;
  border: none;
  color: rgb(255, 255, 255);
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

.input {
  width: 50%;
  border-radius: 20px;
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

.small {
  max-width: 600px;
  margin: 100px auto;
}

.browse {
  margin: auto;
  width: 60%;
}

.box {
  font-size: 15px;
  text-align: center;
  width: 150px;
  height: 130px;
  margin: 10px;
}

.post-meta {
  color: #212529;
  font-weight: 300;
  font-family: 'Lora', 'Times New Roman', serif;
  font-size: 15px;
}

.des {
  text-align: justify;
  text-indent: 50px;
  line-height : normal;
  margin-left: 80px;
  margin-right: 80px;

}

</style>
