  <template>
  <div>
    <!-- Admin -->
    <Admin/>
    <b-card class="add mb-3"  v-if="blog" :key="blog.id">
      <div class="add mb-3" >
        <img blank blank-color="#ccc" width="600" height="450"  :src="blog.imagepreview"/>
      </div>
      <b-media>
        <b-media-body class="ml-3">
          <h4>{{blog.title}}</h4>
          <h6>
            {{blog.description}}
          </h6>
            <!-- {{blog.selected}} -->
          
              <div class="small">
                <!-- <bar v-if="blog.selected == 'bar'" :data="graphdata"></bar> -->
                <line-chart v-if="blog.selected == 'line'" :data="blog.graphdata"></line-chart>
                <!-- <doughnut v-if="blog.selected =='doughnut'" :data="graphdata"></doughnut>
                <pie v-if="blog.selected =='pie'" :data="graphdata"></pie>
                <bubble v-if="blog.selected =='bubble'" :data="graphdata"></bubble>
                <horizaontal-bar v-if="blog.selected =='horizontal'" :data="graphdata"></horizaontal-bar> -->
              </div>
          <!-- <router-link :to="{ name : 'Overviews'}"><b-button variant="success">Back</b-button></router-link> -->
        </b-media-body>
      </b-media>
    </b-card>
  <Footer/>
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
.small {
  max-width: 600px;
  margin: 100px auto;
}
.img {
  text-align: center;
}
</style>
