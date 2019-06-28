
localStorage.removeItem("gameDescription");//Erasing the Local Storage (IVER)
var buttonsArray = ["Reviews", "Prices", "Developers"]
var apiKey = "bf4a00432b31ea4966819b748105a4d93da12821";


$("#search-button").on("click", function () {
    //prevent page to refresh
    event.preventDefault();
    //variables for user input and for url
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
        
        clearing();
        var data = response.results[0];
        var posterImage = $("<img>");

        posterImage.attr("src", data.image.small_url);
        posterImage.attr("id", "poster")
        $("#game-poster").append(posterImage);

        var descriptionBox = $("<h6>");
        descriptionBox.html(data.deck);
        $("#description").append(descriptionBox);

        var platformsArray = data.platforms;

        for (var i = 0; i < platformsArray.length; i++) {
            var platformContainer = $("<p>");

            platformContainer.text(platformsArray[i].name);
            $("#platform").append(platformContainer);
        }
        // Saving into the Local Storage the Overview of the game to show it on the Review page. (IVER)
        localStorage.setItem("gameDescription",data.description);
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
});


