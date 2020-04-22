<template>
  <div class="container-fluid" id="hi">
    <div class="bg-img">  
    <div class="nav1">
      <nav class="navbar navbar-light bg-light nav">
        
        <ul>
          <li>
            <center><h4><b> To-Do-App</b></h4></center>
          </li>
          <li class="all">
            <router-link :to="{name:'login'}"><h5><b> Sign In </b></h5> </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-fluid">
    <center><div class="signup-form">
      <form @submit.prevent="signup">
        <h3><b>Sign Up</b> </h3>
        <p>Please fill in this form to create an account!</p>
        <hr>
        <div class="form-group">
          <input type="text" placeholder="USERNAME" name="username" required="required" v-model="username">
        </div>
        <div class="from-group">
          <input type="email" name="email" placeholder="Email Address" required="required" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" name="password" placeholder="Enter Password" required="required" v-model="password">
        </div>
        <div class="form-group">
          <input type="password" name="password" placeholder="Confirm Password" required="required" v-model="confirm_password">
        </div>
        <p v-if="feedback">{{feedback}}</p>
        <p v-if="fun">{{fun}}</p>
        <div>
          <button type="submit" class="btn btn-primary btn1"><b>Sign Up</b></button>
        </div>
      </form>
      <div>
        <center>Already have an account?</center><router-link :to="{name: 'login'}">Login here</router-link>
      </div>
    </div></center>
    </div></div>
</div>

</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'signup',
  data () {
    return {
      username: null,
      email: null,
      password: null,
      confirm_password: null,
      feedback: null,
      notes: []
      
    }
  },
  methods: {
    signup() {
      if(this.email && this.password.length >= 6 && this.password == this.confirm_password)
      {
        this.feedback=null

        let ref=db.collection("users").doc(this.email)
        ref.get().then(doc => {
          if(doc.exists)
          {
            this.feedback=" Account Already exists"
          }
          else
          {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .catch(err => {
              console.log(err)
              this.feedback=err.message
              })
              db.collection("users").doc(this.email).set({
              username: this.username,
              email: this.email,
              password: this.password,
              notes:[]
              }).then(() => {
                this.$router.push({name: 'todo', params: {username:this.username, email:this.email, password:this.password}})
                alert("Account created Successfully")
              })
              
          }
          
        
        })
      }
      else
      {
        this.feedback="Enter the correct Password and Your Password length should be Atleast 6 characters"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav{
    background-color: transparent;
    color: white;
    font-style: italic;
    height: 70px !important;
    padding-left: 20px;   
  }
  .signup-form{
    width: 30%;
    margin-top: 60px;
    
    padding: 30px;
    background-color: white;
    color: black;
    text-decoration-color: white;
    border-radius: 5px;
    font-size: 20px;
  }
  .bg-img{
    background-image: url("sign.jpg");
    position: relative;
    height: 800px;
    background-size: cover;
  }
  .btn1{
    background-image: url("btn.png");
    background-size: cover;
    border-radius: 30px;
    padding: 10px;
    width: 50%;
    height: 50px;
  }
  .all{
    float: right !important;
  }
  @media only screen and (max-width: 600px){
    .signup-form{
    width: 70%;
    margin-top: 60px;
    
    padding: 30px;
    background-color: white;
    color: black;
    text-decoration-color: white;
    border-radius: 5px;
    font-size: 20px;
  }
  }
  
</style>