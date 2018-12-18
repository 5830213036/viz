<template>
    <div>
<body>
    <div class="container">
        <div class="row">     
            <b-card>             
                <div class="container" >
                    <b class="total">Sign Up</b>
                </div>
                <div class="container">
                    <!-- <label class="label"><b>Email</b></label>       -->
                    <input type="text" placeholder="Your Email" v-model="formData.email" required>      
                    <!-- <label class="label"><b>Password</b></label> -->
                    <input type="password" placeholder="Your Password" v-model="formData.password" required>
                    <button class="btn-login"  v-on:click="register()"><b>SIGN UP</b></button>  
                     <router-link :to="{ name :'Main'}">                    
                        <a  class="previous round">Back to Home Page</a>                    
                    </router-link>
                </div> 
            </b-card>
        </div>
    </div>
</body>    
</div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
name: "register",
data(){
    return {
        formData: {
        email: "",
        password: ""
      }
    }
},
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.formData.email, this.formData.password)
        .then(() => {
          // Do Something After Sign in
          //console.log(user)
          alert('Create account complete ');
          this.$router.push("sign-in");
        })
        .catch(e => {
          alert(e.message);
        });
    }
  }
}
</script>

<style scoped>


body {
  /* background: #9CECFB; */
  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #0052D4, #65C7F7, #9CECFB); */
  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #0052D4, #65C7F7, #9CECFB); */
  background: linear-gradient(#e66465, #b0b5f0);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.card {
  text-align: center;
  padding: 1.5rem;
  margin: 10% auto 10% auto;
  border: 1px;
  width: 50%;
  border-radius: 30px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 5px 25px;
  margin: 10px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 30px;
}

input[type="text"]:focus {
  outline: none;
  box-shadow: 0px 0px 2px blue;
}

/* .label {
  justify-content: left;
  margin-left: 80px;
} */

input[type="password"]:focus {
  outline: none;
  box-shadow: 0px 0px 2px blue;
}

input::placeholder {
  font-weight: bold;
}

.total {
  font-size: 25px;
  color: black;
}

a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 17px;
    margin: -2%;
    color: black;
    font-weight: bold;
    font-size: 13px;
}


.back {
 text-align: left;
 margin-left: 5px;
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
  background: linear-gradient(#6bf350, #cde757);
}

.btn-login:hover {
  opacity: 0.8;
}

.btn-login:focus {
  outline: none;
  box-shadow: 0px 0px 2px blue;
}

.container {
  padding: 10px;
  text-align: center;
  border-radius: 30px 30px 30px 30px;
}
</style>
