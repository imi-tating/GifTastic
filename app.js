var topics = ["cats", "kittens"];
var stillGifs = [];
var animatedGifs = [];

//creates intial buttons on screen
function createButtons() {
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-dark").attr("id",  "btn-" + topics[i]);
    newButton.text(topics[i]);
    $("#buttons-container").append(newButton);
  }
}

//empties gif-container and then generates 10 gifs per queryURL array given it
function generateGifs(gifArray) {
  $("#gifs-container").empty();
  for (var i = 0; i < gifArray.length; i++) {
    var stillURL = gifArray[i].images.fixed_width_still.url
    var animatedURL = gifArray[i].images.fixed_width.url

    var newImg = $("<img>");
    newImg.attr('src', stillURL);
    newImg.attr('alt', gifArray[i].title);
    newImg.addClass("still gif");
    newImg.attr("data-number", i);
    $("#gifs-container").append(newImg);

    stillGifs.push(stillURL);
    animatedGifs.push(animatedURL);
  }
}

//toggles between still and animated gifs
function toggler() {
  var indexNumber = $(this).attr("data-number");
  if ($(this).hasClass("still")) {
    $(this).attr('src', animatedGifs[indexNumber]);
    $(this).removeClass("still").addClass("animated");
  } else if ($(this).hasClass("animated")) {
    $(this).attr('src', stillGifs[indexNumber]);
    $(this).removeClass("animated").addClass("still");
  }
}



$(document).ready(function(){
  createButtons();



  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "cats" +"&api_key=UbmXXAGHrjMt1Xbwi9cKpctCgD0xqtoI&limit=10"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    // console.log(response);
    generateGifs(response.data);
    console.log(animatedGifs);
  })

  $(document).on("click", ".gif", toggler);



})
