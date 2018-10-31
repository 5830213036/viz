<template>
    <div>
      <!-- User -->
      <User/>
        
        <b-card class="mb-3" v-if="blog" :key="blog.id">
        <img blank blank-color="#ccc" width="600" height="450" alt="placeholder" :src="blog.imagepreview"/>
        <b-media no-body >
        <b-media-body class="ml-3">
        {{blog.time}}
        <h2 class="mt-4">{{blog.title}}</h2>
        <h3  class="mt-4">
            {{blog.description}}
        </h3>
         <!-- {{blog.selected}} -->
        <div class="small">
        <bar v-if="blog.selected == 'bar'"></bar>
        <line-chart v-if="blog.selected == 'line'"></line-chart>
        </div>
        </b-media-body>
        </b-media>
        </b-card>
    <Footer/>
    </div>
</template>

<script>
import db from "@/firebase/init";
import Bar from "../Chart/BarChart.js";
import LineChart from "../Chart/LineChart.js";
//User  
import User from '../User/User.vue'
//Other
import Footer from '../Other/Footer.vue'
export default {
  name: "Readmore",
  components: { Bar, LineChart, User ,Footer},

  data() {
    return {
      image: require('@/assets/PTEIHEAD.png'),
      blog: []
    };
  },
  created() {
    let ref = db
      .collection("blogs")
      .where("slug", "==", this.$route.params.detail_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.data())
        this.blog = doc.data();
        this.blog.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
.card {
  text-align: center;
  max-width: 800px auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
}
.small {
  max-width: 600px;
  margin: 100px auto;
}
.form {
  text-align: center;
  max-width: 800px auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
  
}

</style>
