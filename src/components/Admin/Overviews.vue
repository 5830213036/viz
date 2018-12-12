<template>
    <div>
    <!-- Admin -->
    <Admin/>

    <div class="topic">    
        <h4 class="ptei"> PTEI Data Visualization </h4>
        <hr>
        <p class="thai">PTEI Data Visualization เป็นการนำเสนอข้อมูลเชิงภาพ (Data Visualization) 
            ซึ่งข้อมูลจะถูกออกแบบผ่านรูปแบบแผนผัง เพื่อแสดงความสัมพันธ์ของข้อมูลในเชิงปริมาณให้ดูน่าสนใจ 
            เข้าใจง่าย เห็นภาพรวมชัดเจน ง่ายต่อการจดจำ</p>    
    </div>

    <!-- Search -->
    <section>
      <b-nav-form class="search">       
        <b-form-input size="md" v-model="search" type="text" placeholder="Search keywords..."/>
          <Share/>
          <!-- Create a blog -->
          <router-link :to="{ name : 'Addblog'}" >
            <b-button  class="button-c">Create</b-button>
          </router-link>
      </b-nav-form>
    </section>


    <!-- Contents blog -->
        <b-card class="card mb-4"  v-for="blog in bsearch" :key="blog.id">          
                        
          
            <!-- Delete -->
            <div class="close">    
                <img @click="deleteblog(blog.id)" src="../../assets/delete.png" width="30" height="25" />              
            </div> 
            
            <!-- Edit -->
            <div class="close">
                <router-link :to="{name:'Editblog', params: {edit_slug: blog.slug}}">
                    <img   src="../../assets/edit.png" width="25" height="25"/>
                </router-link>
            </div>
            <b-media no-body>
                <b-media-aside vertical-align="center">
                    <img  blank blank-color="#ccc" width="450"  height="300" alt="placeholder" :src="blog.imagepreview"/>
                </b-media-aside>
                    <b-media-body class="ml-3">
                        <b-media-body class="content">
                            <h4 class="ptei mt-0 mb-1">{{blog.title}}</h4>
                            <!-- <i class="post-meta">{{ blog.time}}</i> -->
                            <h6>
                                <!-- {{blog.description}} -->
                                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nam laoreet, nunc et accumsan cursus, neque eros sodales lectus.... -->
                            </h6>       
                            <div>           
                                <router-link :to="{name : 'Detailblog', params: {detail_slug : blog.slug}}">
                                    <button size="sm" class="button" style="vertical-align:middle" type="submit" ><span>Read More</span></button>
                                </router-link>
                                
                            </div>
                            <i class="post-meta">{{ blog.time}}</i>
                        </b-media-body>  
                    </b-media-body>
                   
                </b-media>

        </b-card>
        <Footer/>
    </div>    
</template>

<script>
import db from "@/firebase/init";
import Admin from "../Admin/Admin.vue";
//Other
import Footer from "../Other/Footer.vue";
import Share from '../Other/Share.vue'
import moment from "moment";
export default {
  components: { Admin, Footer ,Share},
  name: "Main",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    let ref = db.collection("blogs").orderBy("time","desc")
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        let blog = doc.data();
        blog.id = doc.id;
        this.blogs.push(blog);
        // this.blogs.push(doc.data())
      });
    });
  },
  computed: {
    bsearch() {
      return this.blogs.filter(blog => {
        return blog.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    deleteblog(id) {
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this bolg!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal("Deleted!", "Poof! Your blog has been deleted!", {
            icon: "success"
          });
          db.collection("blogs")
            .doc(id)
            .delete()
            .then(() => {
              this.blogs = this.blogs.filter(blog => {
                return blog.id != id;
              });
            });
        } else {
          //   swal("Your imaginary file is safe!");
        }
      });
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fredoka+One');
@import url('https://fonts.googleapis.com/css?family=Kanit');

.topic {
    text-align: center;
    margin-top: 5%;
    margin-left: 13%;
    margin-right: 13%;
    margin-bottom: 5%;
}

.ptei {
    font-family: 'Fredoka One', cursive;
    color: rgb(10, 15, 13)
}

hr {
    width: 10%;
    height: 15%;
    border: 1px solid rgb(41, 59, 224);
}

.thai {
    font-size: 18px;
    font-family: 'Kanit', sans-serif;
}

.search{
  margin: 20px;
  margin-left: 150px;
  margin-right: 60px;
}

input[type="text"] {
  width: 190px;
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
  width: 63%;
}

.card {
  text-align: center;
  max-width: 75%;
  margin-top: 20px;
  /* margin-right: 100px;
  margin-left: 100px; */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.button {
  display: inline-block;
  border-radius: 50px;
  background: linear-gradient(#0bc0b1);
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

.button:focus {
  outline: none;
  box-shadow: 0px 0px 2px white;
}

.content {
  margin-top: 100px;
}

.button-c {
  border-radius: 30px;
  background: linear-gradient(#51a4f1);
  border: none;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 15px;
  padding: 2px;
  width: 100px;
  height: 30px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 4px;
  margin-top: 4px;
  
}

.post-meta {
  color: #212529;
  font-weight: 300;
  font-family: 'Lora', 'Times New Roman', serif;
  font-size: 15px;
  float: right;
  margin-top: 100px;
  margin-right: -80px;

}

.close {
  padding: 5px;  
  color: rgb(211, 27, 27); 
  opacity: .4;
}





</style>
