<template>
    <div>
    <!-- Navbar -->
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <router-link :to="{ name :'Overviews'}">
                <b-navbar-brand>PTEI Visualization</b-navbar-brand>
            </router-link>
            <!-- Right aligned nav items -->
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="signout()">
                            Sign Out
                        </b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
    </b-navbar>
    <!-- Image -->
    <div>
        <b-img :src="image" fluid-grow   alt="Responsive image" />
    </div>

    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name : 'Admin',
    data(){
        return {
            image: require('@/assets/PTEIHEAD.png'),
            formData:{
                    email:'',
                    password:''
                }
        }
    },
        methods : {
            signout(){
                  this.$router.push('/')   
                  console.log('signOut')               
    }
}
}
</script>

<style scoped>
/* Center the image and position the close button */
input[type="text"] {
  padding: 16px;
  border-radius: 4px 4px 0 0;
  background: transparent;
  border: 1px solid #CFD0D1;
  display: block;
  margin: 0 auto;
  width: 75%;
}
input[type="password"] {
  padding: 16px;
  border-radius: 0 0 4px 4px;
  border: 1px solid #CFD0D1;
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
  box-shadow: 0 8px 15px 0 rgba(18, 151, 147, .4);
  display: inline ;
  margin-left: 90px;
  margin-top: 10px;
  width: 30%;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  
}
.container-signin{
    position: relative;
    width: 700px;
    height: 350px;
    margin: 0 auto;
    border: 1px solid #EEEEEE;
    box-shadow: 0 0 8px 2px #ccc;
    margin-top: 50px;
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
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
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

}

</style>
