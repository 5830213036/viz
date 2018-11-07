<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return{
     
    }
  }
}
</script>

<style>

#app {
  font-family: Calibri;
  font-size: 20px;
  text-align: auto;
  color: #2c3e50;
  margin-top: 0px;
}

</style>
