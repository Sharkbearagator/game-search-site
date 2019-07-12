
// window.onload = alert(localStorage.getItem("gameDescription")); 
$("#description").append(localStorage.getItem("gameDescription"));

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC7DFF1nM3xl7dJH0siTbRiLUVrNMHGYuo",
    authDomain: "game-search-project.firebaseapp.com",
    databaseURL: "https://game-search-project.firebaseio.com",
    projectId: "game-search-project",
    storageBucket: "",
    messagingSenderId: "64495615699",
    appId: "1:64495615699:web:a6d486807f21c4d9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //getting firebase database stored in a variable...
  var dataRef = firebase.database();

  //firebase auth.. for when user logs in...
  var provider = new firebase.auth.GoogleAuthProvider();


//login in these pages always hiding...
$("#login").hide();
$("#logout").hide();

//
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     
      var email = user.email;

      console.log(email);
  
      

      // ...
    } else {
      // User is signed out.
     console.log("please login");
     
    }
  });





