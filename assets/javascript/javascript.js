var topics = ["australia", "antartica", "canada", "china", "usa", "ethiopia", "france", "japan", "india", "iceland", "thailand", "russia"];

var apiKey = "&api_key=Tz9cVw3eIhSi3UNKdAQ2yYDpixlXKdDc";

var results;


function displayInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        results = response.data;

        for (var i = 0; results.length; i++) {
        
            var gifDiv = $("<div>");
            var gifImage = $("<img>");

            gifImage.addClass("gif m-1");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("still", results[i].images.fixed_height_still.url);
            gifImage.attr("animate", results[i].images.fixed_height.url);
            gifDiv.append(gifImage);

            var rating = results[i].rating;
            var ratingP = $("<div>").text("Rating: " + rating);
            gifDiv.append(ratingP);

            $("#gif-display").prepend(gifDiv);
        }
    })
}

function renderButtons() {

    $("#buttons-view").empty();
    
    for (var i= 0; i < topics.length; i++) {

        var a = $("<button>");

        a.addClass("btn btn-light place-btn text-center mx-auto col-m-1");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-place").on("click", function(event){
    var userTopic = $("#place-input").val().trim();
    topics.push(userTopic);
    renderButtons();
    $("#place-input").val("");
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log("string");

    if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
    }
})

$(document).on("click", ".place-btn", displayInfo);

renderButtons();