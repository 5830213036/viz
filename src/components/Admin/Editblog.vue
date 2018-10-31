<template>
    <div class="edit-blog">
        <b-card  v-if="blog" class="card mb-3">
            <h2 class="add">Edit Your Blog {{blog.title}}</h2>
        <!-- {{this.$route.params.edit_slug}} -->

<!-- image -->
            <div class="add mt-3">  
                <img :src="blog.imagepreview" class="preview-image" v-on:click="openupload" alt="Responsive image" />
                <b-form-file type="file" name="image" id="file-filed" v-on:change="updatepreview"></b-form-file>
            </div>

            <label class="head mt-3">Title </label>
                <b-form-input   class="input"
                                type="text"
                                v-model="blog.title"
                                required
                                placeholder="Enter Title">
                </b-form-input>



            <label class="head mt-3">Description </label>
                <b-form-textarea    class="input"
                                    type="text"
                                    id="description"
                                    v-model="blog.description"
                                    placeholder="Enter Description"
                                    :rows="3"
                                    :max-rows="6">
                </b-form-textarea>
    <!-- preview -->
    <!-- <pre class="mt-3">{{ blog.title }}</pre> -->


    <!-- select a chart -->
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
            options: [{ text:'Line' , value:'line'},{text:'Bar',value:'bar'}]
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
     }
    }
}
</script>

<style>
.card {
  text-align: center;
  max-width: 800px auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
}
</style>
