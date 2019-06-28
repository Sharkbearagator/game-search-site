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

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(user);

    useThisKey(user);

   

    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
   
    // ...
  });







function useThisKey(user){


//giantbomb API front page changes.....

var apiKey = "bf4a00432b31ea4966819b748105a4d93da12821";


$("#search-button").on("click", function () {
    //prevent page to refresh
    event.preventDefault();
    //variables for user input and for url
    var gameName=$("#game-search-box").val();
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey +"&limit=3&number_of_user_reviews=50";

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
        
        clearing();
       
        console.log(response);

        var data= response.results[0];

        console.log(data.name);

        var posterImage= $("<img>");
        

        posterImage.attr("src", data.image.small_url);
        posterImage.attr("id","poster")
        $("#game-poster").append(posterImage);


        //creating button to save games to save to favorites:
        var favButton =$("<button>");
        favButton.text("save to favorite games");
        $("#game-poster").append(favButton);

        var descriptionBox =$("<h4>");

        descriptionBox.html(data.deck);
        $("#description").append(descriptionBox);

        var platformsArray = data.platforms;

        for(var i=0;i<platformsArray.length;i++){
            var platformContainer=$("<p>");

            platformContainer.text(platformsArray[i].name);
            $("#platform").append(platformContainer);

            console.log(platformsArray[i].name);

        }


        var dataRef = firebase.database();
        //when they click on favButton button: 
        favButton.on("click",function(){
            console.log(gameName);
            var email =user.email
            console.log(email);
            //for us to store database using email as property for the values 
            var finalEmail= email.split('.').join("");
          //storing here
            dataRef.ref(finalEmail +"/favoriteGames").push({
                name: gameName,
              });
        })
        

        
       
        //will use to call database stored values: 
        dataRef.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot);
            // name = childSnapshot.val().name;

            // console.log(name);
    


        });




    });

    function clearing(){
       // $("#game-search-box").val("");
        $("#game-poster").empty();
        $("#description").empty();
        $("#platform").empty();
        



    }
   
    

});

}


