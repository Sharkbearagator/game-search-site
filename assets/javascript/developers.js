var index = localStorage.getItem("devsCount");
for (var i = 0; i < index; i++) {
    var newP = $("<p>");
    newP.text(localStorage.getItem("gameDevs" + i));
    $("#description").append(newP);
}