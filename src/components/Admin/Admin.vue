<template>
    <div>
    <!-- Navbar -->
    <b-navbar toggleable="md" type="dark"  class="navbar">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <router-link :to="{ name :'Overviews'}">
                <b-navbar-brand>PTEI Visualization</b-navbar-brand>
            </router-link>
            <!-- Right aligned nav items -->
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button size="sm" class="button" type="submit" @click="signout()"><span>Sign Out</span></b-button>
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

.navbar {    
  background: linear-gradient(#e66465, #b0b5f0);
  /* background:#e66465; */
  border: 5px;
  border-color: #ccc;
  width: 100%;
   
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
