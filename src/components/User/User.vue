<template>
    <div>
        <!-- Navbar -->
            <b-navbar toggleable="md" type="dark" variant="info">
                <!-- <b-navbar-toggle target="nav_collapse"></b-navbar-toggle> -->
                    <router-link :to="{ name :'Main'}">
                        <b-navbar-brand>PTEI Visualization</b-navbar-brand>
                    </router-link>
        <!-- Right aligned nav items -->
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button size="sm" class="my-2 my-sm-0" onclick="document.getElementById('signin').style.display='block'">
                            Sign In
                        </b-button>
        <!-- The Modal -->
            <div id="signin" class="modal">
                <span onclick="document.getElementById('signin').style.display='none'" class="close" title="Close Modal">&times;</span>
        <!-- Modal Content -->
        
            <form class="m-content animate">
                <div class="container-signin">
                    <h1>Welcome</h1>
                    <div class="form-group">
                      <input type="email" class="form-control" id="inputEmail" placeholder="Email Address">
                    </div>

                    <div class="form-group">
                      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                    </div>
                        <input type="text" placeholder="Email" v-model="formData.email" required/>
                        <input type="password" placeholder="Password" v-model="formData.password" required/>
                        <input type="submit" width="" value="Sign In"  @click="signIn()"/>
                        <input type="submit" width="" value="Cancel"  onclick="document.getElementById('signin').style.display='none'"/>
                </div> 
            </form>
            </div>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
            </b-navbar>
        <!-- Image -->
             <div>
                <b-img :src="image" fluid-grow height="500" width="500"/> 
        <!-- fluid-grow -->
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
      image: require("@/assets/PTEIHEAD.png"),
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .then(user => {
          // Do Something After Sign in
          //console.log(user)
          this.$router.push("Overviews");
        })
        .catch(e => {
          alert(e.message);
        });
    }
  }
};
</script>

<style scoped>
/* Center the image and position the close button */
input[type="text"] {
  padding: 16px;
  border-radius: 4px 4px 0 0;
  background: transparent;
  border: 1px solid #cfd0d1;
  display: block;
  margin: 0 auto;
  width: 75%;
}
input[type="password"] {
  padding: 16px;
  border-radius: 0 0 4px 4px;
  border: 1px solid #cfd0d1;
  border-top: none;
  background: transparent;
  display: block;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 75%;
}

input[type="submit"] {
  padding: 10px;
  border-radius: 50px;
  background: #129793;
  border: none;
  box-shadow: 0 8px 15px 0 rgba(18, 151, 147, 0.4);
  display: inline;
  margin-left: 90px;
  margin-top: 10px;
  width: 30%;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
}
.container-signin {
  position: relative;
  width: 700px;
  height: 350px;
  margin: 0 auto;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 8px 2px #ccc;
  margin-top: 50px;
  text-align: center;
}
.container-signin.form-control {
  text-align: center;
  margin-bottom:10px;
}
h1 {
  text-align: center;
  font-weight: 100;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 5px;
  padding-top: 50px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.m-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */

  width: 700px;
  height: 350px; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
}
</style>
