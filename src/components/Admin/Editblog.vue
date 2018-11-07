<template>
    <div class="edit-blog">
        <b-navbar toggleable="md" type="dark"  class="navbar">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <router-link :to="{ name :'Overviews'}">
                <b-navbar-brand>PTEI Visualization</b-navbar-brand>
            </router-link>
            <!-- Right aligned nav items -->
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button size="sm" class="button" type="submit" @click="signout()"><span>Sign Out</span></b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
    </b-navbar>

        <b-card  v-if="blog" class="card">
            <h2 class="mb-4">Edit {{blog.title}}</h2>
                <vue-good-wizard 
                    :steps="steps"
                    :onNext="nextClicked" 
                    :onBack="backClicked">


            <div slot="page1">
                <div class="mt-3">  
                    <img :src="blog.imagepreview" class="preview-image" width="450"  height="300" v-on:click="openupload" alt="Responsive image" />
                    <div class="row">
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
    <!-- preview -->
    <!-- <pre class="mt-3">{{ blog.title }}</pre> -->


    <!-- select a chart -->
            <div slot="page2">
            <b-form-group class="head mt-3" label="Select a Chart">
                <b-form-radio-group v-model="blog.selected" 
                                :options="options">
                </b-form-radio-group>
            </b-form-group>

  <!-- preview -->
            <div class="head mt-3">
                Selected: <strong>{{ blog.selected }}</strong>
            </div>

    <!-- chart -->
            <div class="small">
                <bar v-if="blog.selected == 'bar'"></bar>
                <line-chart v-if="blog.selected == 'line'"></line-chart>
            </div>

  <!-- submit -->
            <div class="add">
                <router-link :to="{ name : 'Overviews'}">
                    <b-button variant="success" :v-model="blog.time" v-on:click="Editblog()" >Update</b-button>
                </router-link>

                <router-link :to="{ name : 'Overviews'}">
                    <b-button variant="danger">Cancel</b-button>
                </router-link>
            </div>

            </div>
            </vue-good-wizard>
        </b-card>
    </div>
</template>

<script>
import db from '@/firebase/init'
import Bar from '../Chart/BarChart.js'
import LineChart from '../Chart/LineChart.js'
import slugify from 'slugify'
import moment from 'moment'

export default {
    name : 'Editblog',
    components:{Bar, LineChart},
    data(){
        return{
            
            blog : [] ,
            slug : null ,
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
        }
    },
    created(){
        let ref = db.collection('blogs').where('slug','==',this.$route.params.edit_slug)
        ref.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data())
                this.blog = doc.data()
                this.blog.id = doc.id
            });
        })
    },
    methods : {
        Editblog(){
        this.slug = slugify(this.blog.title,{
        replacement :'-',
        remove : /[$*_+~.()'"!\-;@]/g,
        lower : true 
      })
        db.collection('blogs').doc(this.blog.id).update({
            title : this.blog.title,
            description : this.blog.description,
            selected : this.blog.selected,
            imagepreview : this.blog.imagepreview,
            slug : this.slug,
            time : this.blog.time  
        }).then(() =>{
            // this.$router.push({name : 'Navbar'})
        }).catch(err =>{
            console.log(err)
        })
    },
    openupload(){
         document.getElementById('file-filed').click()
     },
    updatepreview(e){
         var reader, files = e.target.files 
         if(files.length == 0 ){
             console.log('empty')
         }
         reader = new FileReader()
         reader.onload = (e) => { 
             this.blog.imagepreview = e.target.result
         }
         reader.readAsDataURL(files[0])
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
    }
    }
}
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
  border-radius:10px;
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
  content: '\00bb';
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
  width: 800px;
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

.row {
  margin: auto;
  width: 60%;
  
}



</style>
