var places = [
  "Aruba",
  "South Carolina",
  "Washington DC",
  "Hawaii",
  "Virginia",
  "St Louis",
  "charleston sc",
  "Asheville"
];

function showGifButtons() {
  $("#GifButtons").empty();
  for (var i = 0; i < places.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("gifButton");
    newButton.text(places[i]);
    newButton.attr("data-name", places[i]);
    $("#GifButtons").append(newButton);
  }
}
$("#add-place").on("click", function(event) {
  event.preventDefault();
  var place = $("#place-input")
    .val()
    .trim();
  //  is preventing a blank button from being created
  if (place == "") {
    return false;
  }
  places.push(place);
  showGifButtons();
});

showGifButtons();

$(document).on("click", ".gifButton", function() {
  var locations = $(this).attr("data-name");
  console.log("Locations: " + locations);

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    locations +
    "&api_key=jHuT9bWTNiILnCJbrW10NRUZr9mUmiCV&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var placeDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var placesImage = $("<img>");
      placesImage.attr("src", results[i].images.fixed_height_small_still.url);
      placesImage.attr(
        "data-still",
        results[i].images.fixed_height_small_still.url
      );
      placesImage.attr(
        "data-animate",
        results[i].images.fixed_height_small.url
      );
      placesImage.attr("data-state", results[i].images.fixed_height_small.url);
      placesImage.attr("class", "gif");

      placeDiv.append(p);
      placeDiv.append(placesImage);

      $("#gifs-appear-here").prepend(placeDiv);
    }

    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
});
