import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCharts from 'vue-chartjs'
import JsonExcel from 'vue-json-excel'
import vUploader from 'v-uploader'
//Xlsx
import vueXlsxTable from 'vue-xlsx-table'

import VueGoodWizard from 'vue-good-wizard'
Vue.use(VueGoodWizard)

import VueSwal from 'vue-swal'
Vue.use(VueSwal)

Vue.use(require('vue-moment'));
var SocialSharing = require('vue-social-sharing');
Vue.use(SocialSharing);
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
Vue.use(vueXlsxTable)
Vue.use(BootstrapVue, VueCharts)
Vue.use(vUploader, uploaderConfig);
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

const uploaderConfig = {
  // file uploader service url
  uploadFileUrl: 'http://xxx/upload/publicFileUpload',
  // file delete service url
  deleteFileUrl: 'http://xxx/upload/deleteUploadFile',
  // set the way to show upload message(upload fail message)
  showMessage: (vue, message) => {
    //using v-dialogs to show message
    vue.$vDialog.alert(message, null, { messageType: 'error' });
  }
};

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

