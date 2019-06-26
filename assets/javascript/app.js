//  API example url Giantbomb = "https://www.giantbomb.com/api/games/ + ?api_key=bf4a00432b31ea4966819b748105a4d93da12821 (apikey) + &limit=50&filter=name:halo (parameters)"
$("#search-button").on("click",function(event){
    event.preventDefault();
$.ajax({
    url: "https://www.giantbomb.com/api/games/?api_key=bf4a00432b31ea4966819b748105a4d93da12821&limit=50&filter=name:halo",
    method: "GET"
}).then(function(response){
    console.log(response)
})
});