<template>
    <div id="login">
   
    <input type="text" name="email" placeholder="email" v-model="formData.email">
    <input type="password" name="password" placeholder="password" v-model="formData.password">
    <button class="btn btn-success" @click="signIn()">Signin</button>
   
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name : 'Signin',
    data () {
            return {
                formData:{
                    email:'',
                    password:''
                }
            }
        },
        methods: {
            signIn(){
            firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
                .then((user)=>{
                  // Do Something After Sign in
                    //console.log(user)
                  this.$router.replace('/Overviews')                  
                })
                .catch((e)=>{
                    alert(e.message)
                })
            },
        }
}
</script>

<style>

</style>
