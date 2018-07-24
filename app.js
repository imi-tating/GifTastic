var topics = ["cats", "kittens"];
var animatedGifs = [];

function createButtons() {
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-dark").attr("id",  "btn-" + topics[i]);
    newButton.text(topics[i]);

    $("#buttons-container").append(newButton);
  }
}

function generateGifs(gifArray) {
  // $("#gifs-container").empty();
  for (var i = 0; i < gifArray.length; i++) {
    var still = '<img src="'+ gifArray[i].images.fixed_width_still.url+ '" alt="'+ gifArray[i].title +'">'
    var animated = '<img src="'+ gifArray[i].images.fixed_width.url+ '" alt="'+ gifArray[i].title +'">'
    $("#gifs-container").append(still);
    animatedGifs.push(animated);
  }
}

function animateGif() {

}


$(document).ready(function(){
  createButtons();


  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "cats" +"&api_key=UbmXXAGHrjMt1Xbwi9cKpctCgD0xqtoI&limit=10"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);

    generateGifs(response.data);

  })





})
