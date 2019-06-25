
//URL: https://www.giantbomb.com/api/accessory/[guid]/?api_key=[YOUR API KEY]

var apiKey = "bf4a00432b31ea4966819b748105a4d93da12821";


$("#search-button").on("click", function () {
    //prevent page to refresh
    event.preventDefault();

    var gameName=$("#game-search-box").val();
    var queryURL = "https://www.giantbomb.com/api/games/?format=JSON&filter=name:"+ gameName +"&api_key="+ apiKey;

    

    $.ajax({
        url: "https://bypasscors.herokuapp.com/api/?url="+ encodeURIComponent(queryURL),
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

});