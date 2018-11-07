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
                        <b-button size="sm" class="button" onclick="document.getElementById('signin').style.display='block'"><span>Sign In</span></b-button>


                        <!-- The Modal -->
                        <div id="signin" class="modal">  
                          <form class="modal-content animate" >
                            <div class="container" style="background:linear-gradient(#e66465, #9198e5)">
                              <span onclick="document.getElementById('signin').style.display='none'" class="close" title="Close Modal">&times;</span>
                              <b class="total">Admin Sign In</b>
                            </div>

                            <div class="container">
                              <label class="label"><b>Email</b></label>      
                              <input type="text" placeholder="Your Email" v-model="formData.email" required>      

                              <label class="label"><b>Password</b></label>
                              <input type="password" placeholder="Your Password"  v-model="formData.password" required>
    
                              <button class="btn-login" value="Sign In"  @click="signIn()"><b>SIGN IN</b></button>    
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

.navbar {    
  background: linear-gradient(#e66465, #b0b5f0);
  /* background:#e66465; */
  border: 5px;
  border-color: #ccc;
  width: 100%;
   
}

input[type=text], input[type=password] {
  width: 80%;
  padding: 5px 30px;
  margin:10px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 30px;
        
}

input[type=text]:focus {
  outline: none;
  box-shadow: 0px 0px 2px blue;
}

.label {
  justify-content:left;
  margin-left: 80px
}

.total{
  font-size: 25px;
  color: white;
}


input[type=password]:focus {
  outline: none;
  box-shadow: 0px 0px 2px blue;
}



.btn-login {
  font-size: 20px;
  text-align: center;
  color: white;
  margin: 20px;
  padding: 5px;
  border-radius: 30px;
  width: 80%;
  border: 0px;
  background: linear-gradient(#e66465, #b0b5f0);
}

.btn-login:hover {
  opacity: 0.8;
}

.btn-login:focus{
  outline: none;
  box-shadow: 0px 0px 2px blue;
}

.container {
  padding: 40px;
  text-align: center;
  border-radius: 30px 30px 0px 0px;
}

.modal {
  display: none; 
  position: fixed; 
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
  padding-top: 60px;
    
}


.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; 
  border: 1px;
  width: 50%; 
  border-radius: 30px;
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



/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
   from {-webkit-transform: scale(0)} 
   to {-webkit-transform: scale(1)}
}
    
@keyframes animatezoom {
    from {transform: scale(0)} 
    to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}

.button {
  display: inline-block;
  border-radius:10px;
  background-color: #dfcfd7;
  border: none;
  color: rgb(255, 255, 255);
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
  content: '\00bb';
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

</style>
