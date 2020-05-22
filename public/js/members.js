$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    console.log(data);
    $(".member-name").text(data.email);
  });

  // click listener for the create-character button that redirects
  // to the /create-character page
  $("#create-character").on("click", () => {
    $.get("/api/user_data").then((data) => {
      window.location.href = `/create-character?user_id=${data.id}`
    });
  });

  // Route to get all character names
  $("#view-character").one("click", () => {
    $.get("/api/user_data")
      .then((data) => {
        $.get("/api/" + data.id)
          .then((data) => {
            Object.keys(data).forEach((datum) => {
              // Create a small card for each character
              let characterCard = $("<div>");
              characterCard.addClass("character-card");
              characterCard.attr("data-charid", data[datum].id)
              characterCard.html(`${data[datum].id} <b>${data[datum].characterName}<b>
            Class: ${data[datum].class} Level: ${data[datum].level} Race: ${data[datum].race}`);
              $("#view-character-div").append(characterCard);
            });

            // Routes to view-character page
            $(".character-card").on("click", (e) => {
              // $.get("/api/characters/" + $(e.target).attr("data-charid"))
              // .then(() => {
              //   console.log(JSON.stringify(data));
                window.location.href = "/view-character?charid=" + $(e.target).attr("data-charid");
              // .then(() => window.location.href = "/view-character/" + $(e.target).attr("data-charid"));
              // .then(() => window.location.href = "/view-character");
              // console.log($(e.target).attr("data-charid"))
              // .then(() => window.location.href = "/view-character?char_id=" + $(e.target).attr("data-charid"));
            // });
          });
      });
  });
});
})
//