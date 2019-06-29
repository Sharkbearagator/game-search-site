 //empty array, used so we dont favButton.on("click" fuction dont do changes to the dom more than 2 times...
 var favButtonPushes=[]
var favoriteGamesArray=[]
var repetitiveFavoriteGamesPushes=[]
 //hiding games saved chart when user has not login... 
 $("#saved-games-card").hide();

 //api key for our giantbomb api...

 var apiKey = "bf4a00432b31ea4966819b748105a4d93da12821";
 
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

  //getting firebase database stored...
  var dataRef = firebase.database();

  //firebase auth.. for when user logs in
  var provider = new firebase.auth.GoogleAuthProvider();

  //if they click on login tab...
  $("#login").on("click",function(){
    favoriteGamesArray=[]
    $("#savedgames").empty();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    //clearing searches from the dom and the search val: to give the user a fresh start
    clearing();
    
    //showing saved games chart if they have logged in
    $("#saved-games-card").show();

    //calling ajax function and the save to favorites button
    useThisKey(user);
    //getting user's email
    var email =user.email
    console.log(email);
    //for us to store database using email as property for the values 
    var finalEmail= email.split('.').join("");

    
  //function to use to call database stored values from each childSnapshot: 
     dataRef.ref(finalEmail +"/favoriteGames").on("child_added", function (childSnapshot) {
       //testing the values: 
      console.log(childSnapshot.val());
      
      var divForFavoriteGames = $("<div class='favoriteGame'>");
      
      divForFavoriteGames.append(childSnapshot.val().name);

      $("#savedgames").append(divForFavoriteGames);

      //used to avoid pushing twice to firebase same game (refer to the dataRef.ref(....).push array)...
      favoriteGamesArray.push(childSnapshot.val().name);

      console.log(favoriteGamesArray);

      // ha

      });

 //debugger;

 //if they dont get to login successfully...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    //debugger;

  });

});



//event delegator function for when the user clicks on saved games...
$("body").on("click",".favoriteGame",function(){

  console.log($(this).text());
  var gameName=$(this).text();

  event.preventDefault();
  //variables for user input and for url
  var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey +"&limit=3&number_of_user_reviews=50";
  var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:" + gameName + "&api_key=" + apiKey + "&limit=1";

  displayLinks();// calling the 3 tabs (reviews, etc) (IVER)
  
  //ajax function... using jsonp to get results
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
        console.log(data.name);

        //create elements to print image, description and platforms in the Dom
        
        //img..
        var posterImage= $("<img>");
        //give src and id attribute
        posterImage.attr("src", data.image.small_url);
        posterImage.attr("id","poster");
        //append it to #game-poster div
        $("#game-poster").append(posterImage);

        //create <h4> element for the description, deck is html value, when need to write it inside the 
        //new element <h4>, then append the new element to #description div....
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

});

});

//if user decides not to log in, let them call results...
    useThisKey();

function useThisKey(user){

  //giantbomb API front page changes.....
    localStorage.removeItem("gameDescription");//Erasing the Local Storage (IVER)
    

//when they 
$("#search-button").on("click", function () {
    //prevent page to refresh
    event.preventDefault();
    //variables for user input and for url

    var gameName=$("#game-search-box").val();
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey +"&limit=3&number_of_user_reviews=50";
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:" + gameName + "&api_key=" + apiKey + "&limit=1";


    displayLinks();// calling the function to display buttons (review, developers, and price ) (IVER)
    
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

        //create elements,and add information for poster, description and platforms....

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
            $("#savedgames").empty();
            
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
//else we will push to firebase database the favorite game name..... and search term just in case we will need it.....
          else{
            console.log(gameNamePrint);
            var email =user.email
            console.log(email);
            //for us to store database using email as property for the values 
            var finalEmail= email.split('.').join("");
          //storing here in firebase:

          //if the favoriteGamesArray has the game in the list then we dont push to firebase, 
            if(favoriteGamesArray.includes(gameNamePrint)){
              //if it is the first time tries to push repetitive game
              var favGamesDivNotice=$("<div>");
              favGamesDivNotice.attr("id","login-div");
              console.log(repetitiveFavoriteGamesPushes.length)

              if(repetitiveFavoriteGamesPushes.length===0){
                
              favGamesDivNotice.text("*This game is already in your favorite list*");
              $("#game-poster").prepend(favGamesDivNotice);
              repetitiveFavoriteGamesPushes.push("push");
              }
              
              
              else if (repetitiveFavoriteGamesPushes.length===1){
                favGamesDivNotice.text("*please try with a different game*");
                $("#game-poster").prepend(favGamesDivNotice);
                repetitiveFavoriteGamesPushes.push("push");
              }
            }
            //if not we then push....
            else{
            dataRef.ref(finalEmail +"/favoriteGames").push({
                name: gameNamePrint,
                searchTerm: gameName,
              });

            }


            }     
        });
        
        // Saving into the Local Storage the Overview of the game to show it on the Review page. (IVER)
          localStorage.setItem("gameDescription",data.description);



    });
  });

  //removed duplicate function...
  
}

var buttonsArray = ["Reviews", "Prices", "Developers"]

function displayLinks() { //Function to display Links "Reviews","Prices","Developers" after click on submit button (IVER)
//adjusted class becuase had to create another card with same classes; so gave unique id to the searching card (Ginna)
    $("#cardfooter").empty();
    for (var i = 0; i < buttonsArray.length; i++) {
        var href = buttonsArray[i].toLocaleLowerCase();
        var newLink = $("<a>");
        newLink.attr("id", "link");
        newLink.attr("href","../" + href + ".html");
        newLink.text(buttonsArray[i]);
        $("#cardfooter").append(newLink);
    }
}

//to clear divs and input value....
function clearing(){
  $("#game-search-box").val("");
  $("#game-poster").empty();
  $("#description").empty();
  $("#platform").empty();
  
}





