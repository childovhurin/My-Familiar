// Gets the user ID from the query string
let userID = window.location.search.split("=")[1];

// Route to post a new character
$("#new-character-submit").on("click", createNewCharacter);

// Function to create and post a new character
function createNewCharacter(event) {
    event.preventDefault();
    const newCharacter = {
        characterName: $("#charname").val().trim(),
        UserId: userID
    };

    $.post("/api/characters", newCharacter)
        .then(function (data) {
            console.log(data);
        });
};
