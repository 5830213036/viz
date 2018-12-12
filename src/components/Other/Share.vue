<template>
  <div class="hello">
    <facebook :url="url" scale="2"></facebook>
    <twitter :url="url" title="Check me on Github" scale="2"></twitter>
    <!-- <linkedin :url="url" scale="3"></linkedin>
    <telegram :url="url" scale="3"></telegram>
    <whats-app :url="url" title="Hello" scale="3"></whats-app> -->
    <!-- <pinterest :url="url" scale="3"></pinterest> -->
    <!-- <reddit :url="url" scale="3" title="My Github"></reddit> -->
    <google :url="url" scale="2"></google>
    <!-- <email :url="url" subject="Hello" scale="3"></email> -->
  </div>
</template>

<script>
import db from "@/firebase/init";
import {
  Facebook,
  Twitter,
  Linkedin,
  Pinterest,
  Reddit,
  Telegram,
  WhatsApp,
  Email,
  Google
} from "vue-socialmedia-share";
export default {
  name: "HelloWorld",
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    WhatsApp,
    Email,
    Google
  },
  data() {
    return {
      url: "https://viz-data.firebaseapp.com/#/"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello > span {
  padding: 10px;
}
</style>
