<template>
    <div>
      <!-- User -->
      <User/>
        
        <b-card class="card" v-if="blog" :key="blog.id">
          <div class="mb-3" >
            <img blank blank-color="#ccc" width="600" height="450" :src="blog.imagepreview"/>
          </div>

          <b-media>
            <b-media-body class="ml-3">
              <i class="post-meta">{{ blog.time}}</i>
              <h3 class="mt-4">{{blog.title}}</h3>
              
              <div class="row">
                <h5  class="des mt-3">
                  {{blog.description}}
                </h5>
              </div>
              

         <!-- {{blog.selected}} -->
              <div class="small">
                <bargroup v-if="blog.selected == 'bargroup'" :data="blog.graphdata"></bargroup>
                <line-chart v-if="blog.selected == 'line'" :data="blog.graphdata"></line-chart>
                <doughnut v-if="blog.selected =='doughnut'" :data="blog.graphdata"></doughnut>
                <pie v-if="blog.selected =='pie'" :data="blog.graphdata"></pie>
                <HorizontalBar v-if="blog.selected =='horizontal'" :data="blog.graphdata"></HorizontalBar>
              </div>
            </b-media-body>
          </b-media>
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
//User  
import User from '../User/User.vue'
//Other
import Footer from '../Other/Footer.vue'
export default {
  name: "Readmore",
  components: { bargroup, LineChart, Doughnut, Pie, HorizontalBar, User ,Footer},

  data() {
    return {
      image: require('@/assets/PTEIHEAD.png'),
      blog: [],
      graphdata: {
        labels: [],
        datasets: []
      }
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
  max-width: auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
  margin-bottom: 50px;
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
