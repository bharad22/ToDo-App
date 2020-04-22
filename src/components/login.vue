<template>
  <div class="container-fluid">  
    <div class="bg-img"> 
    <div class="nav1">
      <nav class="navbar navbar-light bg-light nav">
        <ul>
            <li>
                <center><h4><b> To-Do-App</b></h4></center>
            </li>
          <li class="all">
            <router-link :to="{name:'signup'}"><h5><b> Sign Up</b></h5> </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-fluid">
    <center><div class="signup-form">
      <form @submit.prevent="login">
        <h3><b>Sign In</b> </h3>
        <hr><br>
        <div class="form-group">
          <input type="email" placeholder="Email" name="Email" required="required" v-model="email">
        </div><br>
        <div class="form-group">
          <input type="password" name="password" placeholder="Enter Password" required="required" v-model="password">
        </div><br>
        <p v-if="feedback">{{this.feedback}}</p>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn1"><b> Login </b></button>
        </div><br>
      </form>
    </div></center></div>
</div>
</div>

</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null,
      username: null,
      password:null,
      notes: []
    }
  },
  methods: {
    login() {
      if(this.email && this.password)
      {
          let ref=db.collection("users").doc(this.email)
          ref.get().then(doc => {
          if(doc.exists)
          {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                db.collection("users").doc(this.email).get().then(doc =>{
                    this.username=doc.data().username
                    this.password=doc.data().password
                    this.$router.push({name: 'todo', params:{username: this.username, email:this.email, password:this.password}})
                })
            }).catch(err => {
            console.log(err)
            this.feedback=err.message
          })
          }
          else{
              this.feedback="Account not found"
          }

      })
    }
    else
    {
        this.feedback="Account not found"
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
    border-radius: 5px;
    height: 550px;
    font-size: 20px;
  }
  .btn1{
    background-image: url("btn.png");
    background-size: cover;
    border-radius: 30px;
    padding: 10px;
    width: 50%;
    height: 50px;
  }
  .bg-img{
    background-image: url("sign.jpg");
    position: relative;
    height: 800px;
    background-size: cover;
  }
  .all{
      float: right;
  }
  @media only screen and (max-width: 600px){
       .signup-form{
    width: 70%;
    margin-top: 60px;
    
    padding: 30px;
    background-color: white;
    color: black;
    border-radius: 5px;
    height: 470px;
    font-size: 20px;
  }
  }
</style>
