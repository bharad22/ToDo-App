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
            <a @click="logout"><h5><b> Sign Out </b></h5></a>
          </li>
        </ul>
      </nav>
      <div class="hi">
          <center><h2><b> Welcome {{this.username}}</b></h2></center>
          <center><h2><b> Make your own ToDo list!!</b></h2></center>
      </div>
     <center> <div class="card card1">
        <div class="card-body card2">
          <input type="text" name="add-notes" id="add-notes" class="textt" placeholder="Add-Notes" required="required" v-model="addnotes">
          <button class="btn1" id="btn1" @click="add"><i class="fas fa-plus"></i></button>
        </div>
        <div  class="card-body card3" v-for="(i,index) in notes" :key="index">
         <input type="text" name="" v-model="notes[index]" class="bb">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i class="fas fa-trash-alt ic" @click="del(i)"></i>
        </div>
      </div></center>
    </div>
   </div>
 </div>
</template>


<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'todo',
    props: ['username','email', 'password', 'notes[]'],
    data() {
        return{
            addnotes: null,
            notes:[]
        }
    },
    mounted(){
        var input = document.getElementById("add-notes");
        input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn1").click();
        }
        });


        db.collection("users").doc(this.email).get().then(doc=>{
            this.notes=doc.data().notes
        })
    },
    methods:{ 
    logout(){
        firebase.auth().signOut().then(() => {
            this.$router.push({name: 'index'})
        })
    },
    add(){
        if(this.addnotes)
        {
            this.notes.push(this.addnotes)
            this.addnotes=null
            console.log(this.username)
            console.log(this.email)
            db.collection("users").doc(this.email).set({
                notes:this.notes,
                email:this.email,
                username:this.username,
                password:this.password
            })
            
        }
    },
    del(i){
        this.notes=this.notes.filter(note=>{
            return note!=i
        })
        db.collection("users").doc(this.email).set({
                notes:this.notes,
                email:this.email,
                username:this.username,
                password:this.password
            })
    }
 }
}
</script>

<style scoped>
 .all{
     float: right;
 }
 .nav{
     background-color: transparent;
    color: white;
    font-style: italic;
    height: 70px !important;
    padding-left: 20px; 
 }
 .bg-img{
    background-image: url("sign.jpg");
    position: relative;
    height: 800px;
    background-size: cover;
    background-position: center;
 }
#add-notes{
     background-color: white;
     width: 81%;
     border: ridge;
     
 }
 .btn1{
     padding:15px 0px;
     width: 17%;
     float: left;
 }
 .card1{
     width: 35%;
     height: fit-content;
 }
 .card2 input[type=text]{
     font-size: 25px;
     width: 90px;
 }
.card3 input[type=text]{
     font-size: 25px;
     
}
.ic{
    margin-bottom: 10px;
    font-size: 25px;
    margin-top: -40px;
    position: absolute;
    cursor: pointer;
    margin-left: 180px;
    margin-right: 100px;
}

@media only screen and (max-width: 600px){
    .card1{
     width: 87%;
     height: fit-content;
 }
 .btn1{
     padding:14px 0px;
     width: 15%;
     float: left;
 }
 .ic{
    margin-bottom: 10px;
    font-size: 25px;
    margin-top: -40px;
    position: absolute;
    cursor: pointer;
    margin-left: 160px;
    margin-right: 10px;
}
}
.textt{
    float: left;
}
h2{
    font-style: italic;
    color: white;
}
</style>