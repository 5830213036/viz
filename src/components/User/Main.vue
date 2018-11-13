<template>
    <div>
    <!-- User -->
    <User/>

    <!-- Search -->
   <b-nav-form class="search" >
        <b-form-input size="md" v-model="search" type="text" placeholder="Search keywords..."/>       
       <!-- Share -->
        <Share/> 
    </b-nav-form>

    <!-- Contents blog -->
        <b-card class="card mb-4"  v-for="blog in bsearch" :key="blog.id">
            <b-media no-body>
                <b-media-aside vertical-align="center">
                    <img  blank blank-color="#ccc" width="450"  height="300" alt="placeholder" :src="blog.imagepreview"/>
                </b-media-aside>
                    <b-media-body class="ml-3">
                        <b-media-body class="content" >
                            <h4 class="mt-0 mb-1">{{blog.title}}</h4>
                          
                            <div>           
                                <router-link :to="{name : 'Readmore', params: {read_slug : blog.slug}}">
                                    <button size="sm" class="button" style="vertical-align:middle" type="submit" ><span>Read More</span></button>
                                </router-link>
                            </div>
                            <i class="post-meta">{{ blog.time}}</i>
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
       let ref = db.collection('blogs').orderBy("time");
       ref.get().then(snapshot => {
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

.search{
  margin: 20px;
  margin-left: 150px;
  margin-right: 70px;
}

input[type="text"] {
  width: 200px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  padding: 5px 30px;
  margin: 10px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 30px;
}

input[type=text]:focus {
  outline: none;
  box-shadow: 0px 0px 2px blue;
  width: 74%;
}

.card {
  text-align: center;
  max-width: 75%;
  margin-top: 20px;
  /* margin-right: 100px;
  margin-left: 100px; */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.button {
  display: inline-block;
  border-radius: 50px;
  background: linear-gradient(#db4bc8, #9198e0);
  /* background-color: #df75a6; */
  border: none;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 14px;
  padding: 0px;
  width: 110px;
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

.button:focus {
  outline: none;
  box-shadow: 0px 0px 2px white;
}

.content{
    margin-top: 100px;
}

.txt{
    font-size: 15px;
}

.post-meta {
  color: #212529;
  font-weight: 300;
  font-family: 'Lora', 'Times New Roman', serif;
  font-size: 15px;
  float: right;
  margin-top: 100px;
  margin-right: 0px;

}

</style>
