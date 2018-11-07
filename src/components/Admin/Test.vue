<template>
    <div>
        <h3>Import Your Data</h3>            
        <vue-xlsx-table @on-select-file="handleSelectedFile" > Import Your Data </vue-xlsx-table>  

        <b-modal  v-model="modalShow" size="lg" v-if="xlsdata"  title="If all right" @ok="handleOk"> 
            <div class="table-responsive">           
              <table  class="table table-bordered">
                <thead >
                    <tr>
                      <th v-for="(head, index) in xlsdata.header" :key="index">{{head}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(body, index) in xlsdata.body" :key="index">
                        <td v-for="item in body" :key="item">{{item}}</td>
                    </tr>
                </tbody>
              </table> 
            </div>           
        </b-modal> 

        <div v-if="isdataOk">        
              <table class="table table-bordered mt-3" >            
                <thead >
                  <tr>
                    <td v-for="(head, index) in xlsdata.header" :key="index">{{head}}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(body, index) in xlsdata.body" :key="index">
                    <td v-for="item in body" :key="item">{{item}}</td>
                  </tr>
                </tbody>
              </table>
              </div>




    </div>
</template>

<script>
    export default {
        data() {
            return {
                xlsdata: null,
                modalShow: false,
                isdataOk: false,
                graphdata: {
        labels: [],
        datasets: []
      }
            }

            },
            methods: {
                handleSelectedFile(convertedData) {
                console.log(convertedData);
                this.xlsdata = convertedData;
                //   window.alert(JSON.stringify(convertedData))
                this.modalShow = true;
            },
            handleOk() {
      console.log("handleOK");
      let graphheader = this.xlsdata.header.slice();
      let found = graphheader.indexOf("Title");
      if (found != -1) graphheader.splice(found, 1);
      this.graphdata.labels = graphheader;

      for (let index in this.xlsdata.body) {
        let body = this.xlsdata.body[index];
        let dataset = {
          label: [],
          data: [],
          fill: false,
          borderColor: [],
          backgroundColor: []
        };
        for (let item in body) {
          if (item == "Title") {
            dataset.label = body[item];
            dataset.backgroundColor = this.getcolors();
            dataset.borderColor = this.getcolors();
          } else {
            dataset.data.push(body[item]);
          }
        }
        this.graphdata.datasets.push(dataset);
      }
      this.isdataOk = true;
      // this.savedata.datasets = this.graphdata.datasets.slice();
      // this.savedata.labels = this.graphdata.labels.slice();
      // console.log(this.savedata)
    }
            }

        }
    
</script>

<style scoped>






</style>

