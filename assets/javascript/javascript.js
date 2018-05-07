var topics = ["australia", "antartica", "china", "usa", "france", "japan", "india", "iceland", "thailand", "russia"];

var apiKey = "&api_key=Tz9cVw3eIhSi3UNKdAQ2yYDpixlXKdDc";


function displayInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var results = response.data;

        for (var i = 0; results.length; i++) {
            // get gifs and display
            var gifDiv = $("<div>");
            var gifImage = $("<img>");

            // gifImage.addClass()
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(gifImage);

            // get rating and display
            var rating = results[i].rating;
            var ratingP = $("<div>").text("Rating: " + rating);
            gifDiv.append(ratingP);

            $("#gif-display").prepend(gifDiv)
        }
    })
    
}

function renderButtons() {

    $("#buttons-view").empty();
    
    for (var i= 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-light place-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-place").on("click", function(event){
    var userTopic = $("#place-input").val().trim();
    topics.push(userTopic);
    renderButtons();
});

$(document).on("click", ".place-btn", displayInfo);

renderButtons();


 