

var apiKey = "bf4a00432b31ea4966819b748105a4d93da12821";


$("#search-button").on("click", function () {
    //prevent page to refresh
    event.preventDefault();
    //variables for user input and for url
    var gameName=$("#game-search-box").val();
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey;

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
        console.log(response);

    });

    

});


