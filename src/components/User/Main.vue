<template>
    <div>
    <!-- User -->
    <User/>
    <!-- Search -->
    <b-nav-form class="search" center>
        <b-form-input size="md" v-model="search" type="text" placeholder="Search"/>
        <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="warning">Search</b-button> -->
       <!-- Share -->
        <Share/> 
    </b-nav-form>

    <!-- Contents blog -->
        <b-card class="card mb-3"  v-for="blog in bsearch" :key="blog.id">
            <b-media no-body>
                <b-media-aside vertical-align="center">
                    <img  blank blank-color="#ccc" width="400"  height="300" alt="placeholder" :src="blog.imagepreview"/>
                </b-media-aside>
                    <b-media-body class="ml-3">
                        <b-media-body class="content" >
                            <h4 class="mt-0 mb-1">{{blog.title}}</h4>
                            {{ blog.time}}
                          
                                <!-- <h9 class="txt">
                                    {{blog.description}}
                                </h9>        -->
                            <div>           
                                <router-link :to="{name : 'Readmore', params: {detail_slug : blog.slug}}">
                                    <button size="sm" class="button" style="vertical-align:middle" type="submit" ><span>Read More</span></button>
                                </router-link>
                            </div>
                        </b-media-body>  
                    </b-media-body>
                </b-media>
        </b-card>
        <!-- Pagination -->
      
        <!-- Footer -->

    </div>
</template>

<script>

import db from '@/firebase/init'
import User from '../User/User.vue'
//Other
import Footer from '../Other/Footer.vue'
import Pagination from '../Other/Pagination.vue'
import Share from '../Other/Share.vue'
export default {
    components :{ User, Footer ,Share ,Pagination},
    name : 'Main',
    data(){
        return{
            blogs : [],
            search : ''
        }
    },
    created(){

        db.collection('blogs').get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
                let blog = doc.data()
                blog.id = doc.id
                this.blogs.push(blog)
                // this.blogs.push(doc.data())
            });
        })
    },
    computed: {
        bsearch(){
            return this.blogs.filter(blog => {
              return  blog.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    
}
</script>

<style scoped>

.card {
  text-align: center;
  max-width: 800px auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
}
.button {
  display: inline-block;
  border-radius: 50px;
  background-color: #df75a6;
  border: none;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 15px;
  padding: 0px;
  width: 130px;
  height: 40px;
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
.search{
    margin: 10px;
}
input[type="text"] {
  padding: 16px;
  border-radius: 4px 4px 0 0;
  background: transparent;
  border: 1px solid #CFD0D1;
  display: block;
  margin: 0 auto;
  width: 50%;
  margin-right: 100px;
}
.content{
    margin-top: 100px;
}
.txt{
    font-size: 15px;
}

</style>
