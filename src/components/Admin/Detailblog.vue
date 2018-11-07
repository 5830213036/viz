  <template>
  <div>
    <!-- Admin -->
    <Admin/>

    <b-card class="card"  v-if="blog" :key="blog.id">
      <div class="mb-3" >
        <img blank blank-color="#ccc" width="600" height="450"  :src="blog.imagepreview"/>
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
          
          <div class="small">
            <bargroup v-if="blog.selected == 'bargroup'" :data="blog.graphdata"></bargroup>
            <line-chart v-if="blog.selected == 'line'" :data="blog.graphdata"></line-chart>
            <doughnut v-if="blog.selected =='doughnut'" :data="blog.graphdata"></doughnut>
            <pie v-if="blog.selected =='pie'" :data="blog.graphdata"></pie>
            <HorizontalBar v-if="blog.selected =='horizontal'" :data="blog.graphdata"></HorizontalBar>
          </div>
          <!-- <router-link :to="{ name : 'Overviews'}"><b-button variant="success">Back</b-button></router-link> -->
        </b-media-body>
      </b-media>
    </b-card>
  <!-- <Footer/> -->
  </div>
</template>

<script>
import db from "@/firebase/init";
import bargroup from "../Chart/BarChartGroup.js";
import LineChart from "../Chart/LineChart.js";
import Doughnut from "../Chart/DoughnutChart.js";
import Pie from "../Chart/PieChart.js";
import HorizontalBar from "../Chart/HorizontalChart.js";
//Admin
import Admin from "../Admin/Admin.vue";
//Other
import Footer from "../Other/Footer.vue";
export default {
  name: "Detailblog",
  components: {
    bargroup,
    LineChart,
    Doughnut,
    Pie,
    HorizontalBar,
    Admin,
    Footer
  },

  data() {
    return {
      blog: [],
      graphdata: {
        labels: [],
        datasets: []
      }
    };
  },
  // created(){
  //     db.collection('blogs').get().then(snapshot => {
  //         snapshot.forEach(doc => {
  //             console.log(doc.data())
  //             // let blog = doc.data()
  //             // blog.id = doc.id
  //             // this.blogs.push(blog)
  //             // this.blogs.push(doc.data())
  //         });
  //     })
  // },
  created() {
    let ref = db
      .collection("blogs")
      .where("slug", "==", this.$route.params.detail_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(this.blog);
        // console.log(doc.data())
        this.blog = doc.data();
        this.blog.id = doc.id;
      });
    });
  }
};
</script>

<style>

.card {
  text-align: center;
  max-width: auto;
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
  margin-bottom: 40px;
}

.small {
  max-width: 600px;
  margin: 100px auto;
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
