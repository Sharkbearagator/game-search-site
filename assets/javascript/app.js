 
 var favButtonPushes=[]
 
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



  //firebase auth.. for when user logs in
  var provider = new firebase.auth.GoogleAuthProvider();


  //if they click on login tab...

  $("#login").on("click",function(){

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    clearing();
    useThisKey(user);


   


    //debugger;



    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    //debugger;

    // ...
  });

});


  //if user decides not to log in, let them call results...
  useThisKey();

function useThisKey(user){


//giantbomb API front page changes.....


localStorage.removeItem("gameDescription");//Erasing the Local Storage (IVER)
var buttonsArray = ["Reviews", "Prices", "Developers"]

var apiKey = "bf4a00432b31ea4966819b748105a4d93da12821";
//Tyler
$(".picture").on("click",function(){
  //prevent page to refresh
  event.preventDefault();
  //variables for user input and for url

  var gameName= this.id;
  var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey +"&limit=3&number_of_user_reviews=50";


  displayLinks();// calling the function (IVER)
  
  //ajax function... using jsonp to get results because otherwise we dont
  $.ajax({
      url: queryURL,
      dataType: "jsonp",
      jsonp: 'json_callback',
      data: {
          api_key: apiKey,
          format: 'jsonp',
      },

  }).then(function (response) {
      //after we get Jsonp
      //clear divs and clear input value.
      clearing();

     
      console.log(response);
      //lets print first value in array
      var data= response.results[0];
      var gameNamePrint =data.name
      console.log(data.name);
      //create elements
      //img..
      var posterImage= $("<img>");
      //give src and id attribute
      posterImage.attr("src", data.image.small_url);
      posterImage.attr("id","poster");
      //append it to #game-poster div
      $("#game-poster").append(posterImage);

      //create <h4> element for the description, deck is html value, when need to write it inside the new element <h4>, then append the new element to #description div
      var descriptionBox =$("<h4>")

      descriptionBox.html(data.deck);
      $("#description").append(descriptionBox);

      //grab platform values from json result, platform values are in an array..
      var platformsArray = data.platforms;

      //to grab each of the array values we use for loop, to repeat each action with each value from platform array..
      for(var i=0;i<platformsArray.length;i++){
          var platformContainer=$("<p>");
          platformContainer.text(platformsArray[i].name);
          $("#platform").append(platformContainer);

          console.log(platformsArray[i].name);
      }

       //creating button to save games to save to favorites:
       var favButton =$("<button>");
       favButton.text("save to favorite games");
       $("#game-poster").append(favButton);
        var dataRef = firebase.database();


      //when they click on favButton button: 
      favButton.on("click",function(){

        console.log(favButtonPushes.length);
        //empty array, will be use for conditional below...
        var pushes=favButtonPushes.length
        
        //if user is undefined and array is empty...
        if (user==null){
          console.log(null);
          var loginDiv=$("<div>");
          loginDiv.attr("id","login-div");
          $("#game-poster").prepend(loginDiv);
          //print message to login
          if(pushes===0){
            loginDiv.text("*Please login to save games*");
            favButtonPushes.push("push");
          }
        // if user is undefined and have clicked button more than once
          else if(pushes===1){
            loginDiv.text("You are not logged in, or have logged in unsuccesfully.");
            favButtonPushes.push("push");
          }
        }

        else{
          console.log(gameNamePrint);
          var email =user.email
          console.log(email);
          //for us to store database using email as property for the values 
          var finalEmail= email.split('.').join("");
        //storing here
          dataRef.ref(finalEmail +"/favoriteGames").push({
              name: gameNamePrint,
              searchTerm: gameName,
            });

          //need to get it to push once just once!!!!!

          }     
      });
      
      localStorage.setItem("gameDescription",data.description);
    });
})
$("#search-button").on("click", function () {
    //prevent page to refresh
    event.preventDefault();
    //variables for user input and for url

    var gameName=$("#game-search-box").val();
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey +"&limit=3&number_of_user_reviews=50";

    var gameName = $("#game-search-box").val();
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:" + gameName + "&api_key=" + apiKey + "&limit=1";


    displayLinks();// calling the function (IVER)
    
    //ajax function... using jsonp to get results because otherwise we dont
    $.ajax({
        url: queryURL,
        dataType: "jsonp",
        jsonp: 'json_callback',
        data: {
            api_key: apiKey,
            format: 'jsonp',
        },

    }).then(function (response) {
        //after we get Jsonp
        //clear divs and clear input value.
        clearing();

       
        console.log(response);
        //lets print first value in array
        var data= response.results[0];
        var gameNamePrint =data.name
        console.log(data.name);
        //create elements
        //img..
        var posterImage= $("<img>");
        //give src and id attribute
        posterImage.attr("src", data.image.small_url);
        posterImage.attr("id","poster");
        //append it to #game-poster div
        $("#game-poster").append(posterImage);

        //create <h4> element for the description, deck is html value, when need to write it inside the new element <h4>, then append the new element to #description div
        var descriptionBox =$("<h4>")

        descriptionBox.html(data.deck);
        $("#description").append(descriptionBox);

        //grab platform values from json result, platform values are in an array..
        var platformsArray = data.platforms;

        //to grab each of the array values we use for loop, to repeat each action with each value from platform array..
        for(var i=0;i<platformsArray.length;i++){
            var platformContainer=$("<p>");
            platformContainer.text(platformsArray[i].name);
            $("#platform").append(platformContainer);

            console.log(platformsArray[i].name);
        }

         //creating button to save games to save to favorites:
         var favButton =$("<button>");
         favButton.text("save to favorite games");
         $("#game-poster").append(favButton);
          var dataRef = firebase.database();


        //when they click on favButton button: 
        favButton.on("click",function(){

          console.log(favButtonPushes.length);
          //empty array, will be use for conditional below...
          var pushes=favButtonPushes.length
          
          //if user is undefined and array is empty...
          if (user==null){
            console.log(null);
            var loginDiv=$("<div>");
            loginDiv.attr("id","login-div");
            $("#game-poster").prepend(loginDiv);
            //print message to login
            if(pushes===0){
              loginDiv.text("*Please login to save games*");
              favButtonPushes.push("push");
            }
          // if user is undefined and have clicked button more than once
            else if(pushes===1){
              loginDiv.text("You are not logged in, or have logged in unsuccesfully.");
              favButtonPushes.push("push");
            }
          }

          else{
            console.log(gameNamePrint);
            var email =user.email
            console.log(email);
            //for us to store database using email as property for the values 
            var finalEmail= email.split('.').join("");
          //storing here
            dataRef.ref(finalEmail +"/favoriteGames").push({
                name: gameNamePrint,
                searchTerm: gameName,
              });

            //need to get it to push once just once!!!!!

            }     
        });
        
        localStorage.setItem("gameDescription",data.description);
      });

      });
        
       
        //will use to call database stored values: 
        dataRef.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot);
            //still trying to figure out how to call inside becuase when calling childsnapshot i dont find the smallest values....

            // name = childSnapshot.val().name;

            // console.log(name);
    




    });



    function clearing() {
        $("#game-search-box").val("");
        $("#game-poster").empty();
        $("#description").empty();
        $("#platform").empty();
    }


    function displayLinks() { //Function to display Links "Reviews","Prices","Developers" after click on submit button (IVER)
        $(".card-footer").empty();
        for (var i = 0; i < buttonsArray.length; i++) {
            var href = buttonsArray[i].toLocaleLowerCase();
            var newLink = $("<a>");
            newLink.attr("id", "link");
            newLink.attr("href","../" + href + ".html");
            newLink.text(buttonsArray[i]);
            $(".card-footer").append(newLink);
        }
    }

}
//Tyler
