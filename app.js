var topics = ["kitten", "paws", "cute", "funny", "silly", "crazy", "sleepy", "hungry", "pizza", "space", "rainbow", "gray", "orange", "purrito", "biscuit", "litter"];
var stillGifs = [];
var animatedGifs = [];
// var pagination

//creates intial buttons on screen
function createButtons() {
  $("#buttons-container").empty();
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-dark gif-btn").attr("id",  "btn-" + topics[i]);
    newButton.attr("data-title", "cats " + topics[i]);
    newButton.text(topics[i]);
    $("#buttons-container").append(newButton);
  }
}

function displayCatInfo() {
  var id = $(this).attr("data-title");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + id +"&api_key=UbmXXAGHrjMt1Xbwi9cKpctCgD0xqtoI&limit=10&offset=" + pagination

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    generateGifs(response.data);
    showMeMore(response.pagination);
  });

}

//empties gif-container and then generates 10 gifs per queryURL array given it
function generateGifs(gifArray) {
  $("#gifs-container").empty();
  // pagination = 0;
  $("#gifs-container").html('<p id="play-pause-text" class="lead text-muted">(Tap gif to play/pause)</p>');
  stillGifs = [];
  animatedGifs = [];
  var newCol = $('<div class="col">');
  $("#gifs-container").append(newCol);
  for (var i = 0; i < gifArray.length; i++) {
    var stillURL = gifArray[i].images.fixed_width_still.url
    var animatedURL = gifArray[i].images.fixed_width.url

    var newCard = $('<div class="card">')

    var newImg = $("<img>");
    newImg.attr('src', stillURL);
    newImg.attr('alt', gifArray[i].title);
    newImg.addClass("card-img-top still gif");
    newImg.attr("data-number", i);
    newCard.append(newImg);

    var newImgOverlay = $('<div class="card-body">');
    var ratingForOverlay = $('<p class=" card-text lead" style="font-size: .7rem; color: Salmon;">Rating: ' + gifArray[i].rating.toUpperCase() + '</p>');
    newImgOverlay.append(ratingForOverlay);
    newCard.append(newImgOverlay);

    newCol.append(newCard);

    stillGifs.push(stillURL);
    animatedGifs.push(animatedURL);
  }
  $("#show-me-more-button").removeClass("invisible").addClass("visible");
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

function showMeMore(paginateMore) {
  // pagination += 10;
  




}




$(document).ready(function(){
  createButtons();

  $("#add-cat-type").click(function(event){
    event.preventDefault();
    var requestedCatType = $("#user-input").val().trim();

    if (topics.indexOf(requestedCatType) == -1 && requestedCatType != "") {
      topics.push(requestedCatType);
      $("#user-input").val("");
      createButtons();
    } else if (requestedCatType == "") {
      alert("Please type in a cat type");
    }
    else {
      alert("This cat type already exists");
      $("#user-input").val("");
    }

  });

  $(document).on("click", ".gif-btn", displayCatInfo)
  $(document).on("click", ".gif", toggler);
  $(document).on("click", "#show-me-more-button", showMeMore);

});
