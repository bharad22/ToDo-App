 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDj-CYvVwHqfdRRfCW8MQYIQDwuhEkBMh4",
    authDomain: "to-do-list-c7b3c.firebaseapp.com",
    databaseURL: "https://to-do-list-c7b3c.firebaseio.com",
    projectId: "to-do-list-c7b3c",
    storageBucket: "to-do-list-c7b3c.appspot.com",
    messagingSenderId: "719631501901",
    appId: "1:719631501901:web:a22e08789bfbaa0f0a6a04",
    measurementId: "G-H24JQSGQD8"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  firebase.analytics();
  export default firebaseApp.firestore();
