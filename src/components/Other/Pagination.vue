<template>
  <paginate
    v-model="page"
    :page-count="10"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>
</template>
 
<script>
export default {
  data() {
    return {
      page: 5
    }
  },
  methods: {
    clickCallback: function(pageNum) {
      console.log(pageNum)
    }
}
}
</script> 