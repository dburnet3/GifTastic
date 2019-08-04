$(document).ready(function () {
    var realityTV = ["Real_Housewives_of_Atlanta", "@RHOP", "@RHOBH", "married2med", "@thehills", "@kuwtk"];

    function renderButtons() {
        $("#realityTV_choices").empty();
        for (i = 0; i < realityTV.length; i++) {
            $("#realityTV_choices").append("<button class='btn btn-success' add-realityTV='" + realityTV[i] + "'>" + realityTV[i] + "</button>");
        }
    }

    renderButtons();

    $("#add-realityTV").on("click", function () {
        event.preventDefault();
        var tv = $("#realityTV-input").val().trim();
        realityTV.push(tv);
        renderButtons();
        return;
    });


    $("button").on("click", function () {
        var tv = $(this).attr("add-realityTV");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            tv + "&api_key=wGqODrEF9qB8qgELw4At7icGNV5E0r0N&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            $("#realityTV").empty();
            for (var i = 0; i < results.length; i++) {
                var mainContainer = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var tv = $("<img>");

                tv.attr("src", results[i].images.original_still.url);
                tv.attr("data-still", results[i].images.original_still.url);
                tv.attr("data-animate", results[i].images.original.url);
                tv.attr("data-state", "still");
                tv.attr("class", "gif");
                mainContainer.append(p);
                mainContainer.append(tv);
                $("#realityTV").append(mainContainer);
            }
        });
    });

    function changeState() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".gif", changeState);

});
