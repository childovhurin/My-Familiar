$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    console.log(data);
    $(".member-name").text(data.email);
    // Set the user id to local storage
    localStorage.setItem("userID", data.id);
  });

  // click listener for the create-character button that redirects
  // to the /create-character page
  $("#create-character").on("click", () => {
    $.get("/api/user_data")
      .then(() => window.location.href = "/create-character");
  });

  // Route to get all character names
  $("#view-character").one("click", () => {
    $.get("/api/user_data")
      .then((data) => {
        $.get("/api/" + data.id)
          .then((data) => {
            Object.keys(data).forEach((datum) => {
              // Get the correct character for icon depending on race
              let characterIcon;
              if(data[datum].race !== null && data[datum].race.toLowerCase() === "elf") {
                characterIcon = $("<img src='assets/images/elf_transparent.png'/>")
                characterIcon.addClass("character-icon");
              } else if(data[datum].race !== null && data[datum].race.toLowerCase() === "human") {
                characterIcon = $("<img src='assets/images/human_transparent.png'/>")
                characterIcon.addClass("character-icon");
              } else if(data[datum].race !== null && data[datum].race.toLowerCase() === "orc") {
                characterIcon = $("<img src='assets/images/orc_transparent.png'/>")
                characterIcon.addClass("character-icon");
              } else if(data[datum].race !== null && data[datum].race.toLowerCase() === "gnome") {
                characterIcon = $("<img src='assets/images/gnome_transparent.png'/>")
                characterIcon.addClass("character-icon");
              } else if(data[datum].race !== null && data[datum].race.toLowerCase() === "dwarf") {
                characterIcon = $("<img src='assets/images/dwarf_transparent.png'/>")
                characterIcon.addClass("character-icon");
              } else if(data[datum].race !== null && data[datum].race.toLowerCase() === "half elf") {
                characterIcon = $("<img src='assets/images/half_elf_transparent.png'/>")
                characterIcon.addClass("character-icon");
              };
              
              // Create a small card for each character
              let characterCard = $("<div>");
              characterCard.addClass("character-card");
              characterCard.attr("data-charid", data[datum].id)
              characterCard.html(`${data[datum].id} ${data[datum].characterName}
            Class: ${data[datum].class} Level: ${data[datum].level} Race: ${data[datum].race}`);
              $("#view-character-div").append(characterCard);
              characterCard.prepend(characterIcon);
            });

            // Routes to view-character page
            $(".character-card").on("click", (e) => {
                window.location.href = "/view-character?charid=" + $(e.target).attr("data-charid");
          });
      });
  });
});
})
//