

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
        


    });

    function clearing(){
        $("#game-search-box").val("");
        $("#game-poster").empty();
        $("#description").empty();
        $("#platform").empty();
        



    }
   
    

});


