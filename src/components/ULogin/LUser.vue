<template>
    <div>
        <!-- Navbar -->
            <b-navbar toggleable="md" type="dark" >
                <!-- <b-navbar-toggle target="nav_collapse"></b-navbar-toggle> -->
                    <router-link :to="{ name :'Main'}">
                        <b-navbar-brand class="navbar-brand">PTEI Visualization</b-navbar-brand>
                    </router-link>
        <!-- Right aligned nav items -->
           <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <!-- <b-button size="sm" class="button" onclick="document.getElementById('signin').style.display='block'"> -->
                       <b-button size="sm" class="button" type="submit" @click="signout()">
                          <span>Sign Out</span>
                       </b-button>
                        <!-- The Modal -->
                        <!-- <div id="signin" class="modal">  
                          <div class="modal-content animate" >
                            <div class="container" style="background:linear-gradient(#e66465, #9198e5)">
                              <span onclick="document.getElementById('signin').style.display='none'" class="close" title="Close Modal">&times;</span>
                              <b class="total">Admin Sign In</b>
                            </div>

                            <div class="container">
                              <label class="label"><b>Email</b></label>      
                              <input type="text" placeholder="Your Email" v-model="formData.email" required>      

                              <label class="label"><b>Password</b></label>
                              <input type="password" placeholder="Your Password"  v-model="formData.password" required>
    
                              <button class="btn-login"><b>SIGN IN</b></button>    
                            </div>      
                          </div>
                        </div> -->
                    </b-nav-form>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
        <!-- Image -->
             <!-- <div>
                <b-img :src="image" fluid-grow height="500" width="500"/> 
            </div> -->

  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                :interval="2000"                
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                :loop="true"
    >
      

      <!-- Text slides with image -->
      <b-carousel-slide class="img-fluid" :img-src="require('@/assets/ladyai2.jpg')" fluid-grow ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide class="img-fluid" :img-src="require('@/assets/oldtown.jpg')" fluid-grow></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide class="img-fluid" :img-src="require('@/assets/PTEIHEAD.png')" fluid-grow ></b-carousel-slide>     

    </b-carousel>
  </div>

    </div>
</template>

<script>
import firebase from "firebase";
//Other
import Footer from "../Other/Footer.vue";
export default {
  name: "User",
  components: { Footer },
  data() {
    return {
      //image: require("@/assets/o-19.jpg"),
      formData: {
        email: "",
        password: ""
      },
      slide: 0,
      sliding: null
    };
  },
  methods: {
    signout() {
      this.$router.push("/");
      console.log("signOut");
    },
    // signIn() {
    //   alert(this.formData.email, this.formData.password)
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.formData.email, this.formData.password)
      //   .then(() => {
          
      //   })
      //   .catch(e => {
      //     alert(e.message);
      //   });
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //     var displayName = user.displayName;
      //     var email = user.email;
      //     var emailVerified = user.emailVerified;
      //     var photoURL = user.photoURL;
      //     var isAnonymous = user.isAnonymous;
      //     var uid = user.uid;
      //     var providerData = user.providerData;
      //     this.$router.push("Overviews");
      //   } else {
      //     // User is signed out.
      //     // ...
      //   }
      // });
    // },

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(#0bc0b1 20%, #eaeaec );
  /* background:#e66465; */
  border: 5px;
  border-color: #ccc;
  width: 100%;
}



.button {
  display: inline-block;
  border-radius: 10px;
  background-color: #faf9f9;
  border: none;
  color: rgb(41, 39, 39);
  text-align: center;
  font-size: 15px;
  padding: 0px;
  width: 90px;
  height: 30px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  margin-top: 10px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

.img-fluid {
  width: 100%;
  height: 500px;
}
   
</style>
