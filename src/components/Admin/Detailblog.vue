  <template>
  <div>
    <!-- Admin -->
    <Admin/>
    <b-card class="card" v-if="blog" :key="blog.id">
      <!-- <div class="mb-3">
        <img blank blank-color="#ccc" width="600" height="450" :src="blog.imagepreview">
      </div> -->
      <b-media>
        <b-media-body class="ml-3">
          <h3 class="mt-4">{{blog.title}}</h3>
            <i class="post-meta">{{ blog.time}}</i>
          <div class="row">
            <h5 class="des mt-3">{{blog.description}}</h5>
          </div>
          <div class="export">
            <b-button variant="outline-danger" v-on:click="_export()">Export</b-button>
          </div>
          <!-- <router-link :to="{ name : 'Overviews'}"><b-button variant="success">Back</b-button></router-link> -->
        </b-media-body>
      </b-media>
      <div class="container-carousel">
        <carousel :per-page="1">
          <slide>
            <div class="small">
              <bargroup v-if="blog.selected == 'bargroup'" :data="blog.graphdata"></bargroup>
              <line-chart v-if="blog.selected == 'line'" :data="blog.graphdata"></line-chart>
              <doughnut v-if="blog.selected =='doughnut'" :data="blog.graphdata"></doughnut>
              <pie v-if="blog.selected =='pie'" :data="blog.graphdata"></pie>
              <HorizontalBar v-if="blog.selected =='horizontal'" :data="blog.graphdata"></HorizontalBar>
            </div>
          </slide>
          <!-- <slide>
            <div class="table-responsive mt-5">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th v-for="label in blog.graphdata.labels" :key="label.blog">{{label}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="body in blog.graphdata.datasets" :key="body.id">
                    <td v-for="dataset in body.data" :key="dataset.blog">{{dataset}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </slide> -->
        </carousel>
      </div>
    </b-card>
    <!-- <Footer/> -->
    <Footer/>
  </div>
</template>

<script>
import XLSX from "xlsx";
const _SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
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
import moment from "moment";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "Detailblog",
  components: {
    bargroup,
    LineChart,
    Doughnut,
    Pie,
    HorizontalBar,
    Admin,
    Footer,
    Carousel,
    Slide
  },

  data() {
    return {
      blog: [],
      graphdata: {
        labels: [],
        datasets: []
      },
      SheetJSFT: _SheetJSFT
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
  },
  methods: {
    _export() {
      var arrObject = [];
      arrObject.push(this.blog.graphdata.labels);
      for (var i = 0; i < this.blog.graphdata.datasets.length; i++) {
        arrObject.push(this.blog.graphdata.datasets[i]["data"]);
      }
      console.log(arrObject);
      const ws = XLSX.utils.aoa_to_sheet(arrObject);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate file and send to client */
      XLSX.writeFile(wb, this.blog.title + ".xlsx");
    }
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
  margin-top: 4%;
}

.post-meta {
  color: #212529;
  font-weight: 300;
  font-family: "Lora", "Times New Roman", serif;
  font-size: 15px;
}

.des {
  text-align: justify;
  text-indent: 50px;
  line-height: normal;
  margin-left: 80px;
  margin-right: 80px;
}

.container-carousel {
  text-align: center;
  margin-top: -6%;
  margin-bottom: 2%;
}

.table-responsive {
  border-collapse: collapse;
  font-size: 15px;
  table-layout: fixed;
  margin-top: 10px;
}

.export {
  text-align: right;
  margin-right: 50px;
  margin-top: 30px;
  margin-bottom: 50px;
}

thead {
  color: white;
  background-color: rgba(199, 57, 123, 0.61);
}
</style>
