$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    console.log(data);
    $(".member-name").text(data.email);
  });
});

// click listener for the view-character button that redirects
// to the /view-character page
// $("#view-character").on("click", () => {
//   $.get("/api/user_data").then((data) => {
//     window.location.href = `/view-character?user_id=${data.id}`
//   });
// });

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
      console.log(data.id);
      $.get("/api/characters/" + data.id)
        .then((data) => {
          Object.keys(data).forEach((datum) => {
            // Create a small card for each character
            let characterCard = $("<div>");
            characterCard.addClass("character-card");
            characterCard.html(`<span>${data[datum].id} <b>${data[datum].characterName}<b>
            Class: ${data[datum].class} Level: ${data[datum].level} Race: ${data[datum].race}</span>`);
            $("#view-character-div").append(characterCard); 
          });
        });
    });
});

