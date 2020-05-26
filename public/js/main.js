// Gets the user ID from the query string
let userID = localStorage.getItem("userID");
let charID;


$(document).ready(function () {
    // Gets the charID from query string
    const query = window.location.search.split("=")[1]
    const firstQueryLetter = window.location.search[1];
    if (firstQueryLetter === "c") {
        charID = query;
        console.log("charID:" + charID);
    }
    // Verifies that user is logged in
    if(userID === null) {
        window.location.replace("/")
        alert("You must be logged in to view this page.")
    // If user is logged in and a charID exists (i.e. user is on view-character page),
    // a call is made to API to determine if character belongs to user
    } else if(userID && charID) {
        $.get("/api/characters/" + charID)
        .then((data) => {
            console.log("this is the returned data", data);
        
            // If character does not belong to user, user is redirected to members page
            if(parseInt(userID) !== data.UserId){
                window.location.replace("/members");
                alert("You do not have permission to view this page.")
            };
        });
    };
});



console.log("this is the real userID", userID)


// const userID = window.location.search.split("=")[1];
const deleteCharacterButton = $("#delete_character_button");
const updateCharacterButton = $("#update_character_button")

// Route to post a new character
$("#new-character-submit").on("click", createNewCharacter);

// Create New Character and View Character buttons
// $("#create-new-character").on("click", () => window.location.href = `/create-character?user_id=${userID}`);
// $("#view-character").on("click", () => window.location.href = `/view-character?user_id=${userID}`);


//Route to generate a random number from the d20 dice click 
$("#d20").on("click", () => {
  console.log("click");
  const roll = Math.floor((Math.random() * 20) + 1);
  $("#rolled-result").html(`${roll}`)
});
$("#d12").on("click", () => {
  console.log("click");
  const roll = Math.floor((Math.random() * 12) + 1);
  $("#rolled-result").html(`${roll}`)
});
$("#d10").on("click", () => {
  console.log("click");
  const roll = Math.floor((Math.random() * 10) + 1);
  $("#rolled-result").html(`${roll}`)
});
$("#d8").on("click", () => {
  console.log("click");
  const roll = Math.floor((Math.random() * 8) + 1);
  $("#rolled-result").html(`${roll}`)
});
$("#d6").on("click", () => {
  console.log("click");
  const roll = Math.floor((Math.random() * 6) + 1);
  $("#rolled-result").html(`${roll}`)
});
$("#d4").on("click", () => {
  console.log("click");
  const roll = Math.floor((Math.random() * 4) + 1);
  $("#rolled-result").html(`${roll}`)
});

// // Function to create and post a new character
function createNewCharacter(event) {
  event.preventDefault();

  let newCharacter = {
    characterName: $("#charname").val(),
    class: $("#class").val(),
    level: $("#level").val(),
    race: $("#race").val(),
    alignment: $("#alignment").val(),
    experiencePoints: $("#experiencepoints").val(),
    strength: $("#basestrength").val(),
    dexterity: $("#dexterity").val(),
    constitution: $("#consitution").val(),
    intelligence: $("#intelligence").val(),
    wisdom: $("#wisdom").val(),
    charisma: $("#charisma").val(),
    currentHitPoints: $("#current_hitpoints").val(),
    armorClass: $("#armor_class").val(),
    initiative: $("#initiative").val(),
    speed: $("#base_speed").val(),
    hitDie: $("#hit_die").val(),
    languages: $("#languages").val(),
    acrobatics: $("#acrobatics").val(),
    animalHandling: $("#animalhandling").val(),
    arcana: $("#arcana").val(),
    athletics: $("#athletics").val(),
    deception: $("#deception").val(),
    history: $("#history").val(),
    insight: $("#insight").val(),
    intimidation: $("#intimidation").val(),
    investigation: $("#investigation").val(),
    medicine: $("#medicine").val(),
    nature: $("#nature").val(),
    perception: $("#perception").val(),
    performance: $("#performance").val(),
    persuasion: $("#persuasion").val(),
    religion: $("#religion").val(),
    sleightOfHand: $("#sleight_of_hand").val(),
    stealth: $("#stealth").val(),
    survival: $("#survival").val(),
    personalityTraits: $("#personality_traits").val(),
    ideals: $("#ideals").val(),
    bonds: $("#bonds").val(),
    flaws: $("#flaws").val(),
    featuresAndTraits: $("#features_and_traits").val(),
    weapon: $("#weapon").val(),
    attackBonus: $("#attack_bonus").val(),
    damage: $("#damage").val(),
    damageType: $("#damage_type").val(),
    spellName: $("#spell_name").val(),
    spellID: $("#spell_id").val(),
    spellType: $("#spell_type").val(),
    spellLevel: $("#spell_level").val(),
    castingTime: $("#casting_time").val(),
    spellRange: $("#spell_range").val(),
    spellComponents: $("#spell_components").val(),
    spellDuration: $("#spell_duration").val(),
    UserId: userID
  };

    // Post new character then redirect to members page
    console.log(newCharacter);
    $.post("/api/characters", newCharacter)
        .then(() => {
            alert("Character created successfully!")
            window.location.href = "/members";
        });
};

// Ajax function to delete a character
const deleteCharacter = function (id) {
    console.log("this is the delete character id: " + id);
    return $.ajax({
        url: "/api/characters/delete/" + id,
        method: "DELETE"
    })
        .then(() => {
            alert("Character has been deleted.");
            window.location.href = "/members";
        });
};

// Delete button listener
deleteCharacterButton.on("click", (event) => {
    event.preventDefault();
    console.log("HERE IS THE CHAR ID: ", charID)
    deleteCharacter(charID);
});

function updateCharacter(event) {
    event.preventDefault();

    let updatedCharacter = {
        characterName: $("#charname").val(),
        class: $("#class").val(),
        level: $("#level").val(),
        race: $("#race").val(),
        alignment: $("#alignment").val(),
        experiencePoints: $("#experiencepoints").val(),
        strength: $("#basestrength").val(),
        dexterity: $("#dexterity").val(),
        constitution: $("#consitution").val(),
        intelligence: $("#intelligence").val(),
        wisdom: $("#wisdom").val(),
        charisma: $("#charisma").val(),
        currentHitPoints: $("#current_hitpoints").val(),
        armorClass: $("#armor_class").val(),
        initiative: $("#initiative").val(),
        speed: $("#base_speed").val(),
        hitDie: $("#hit_die").val(),
        languages: $("#languages").val(),
        acrobatics: $("#acrobatics").val(),
        animalHandling: $("#animalhandling").val(),
        arcana: $("#arcana").val(),
        athletics: $("#athletics").val(),
        deception: $("#deception").val(),
        history: $("#history").val(),
        insight: $("#insight").val(),
        intimidation: $("#intimidation").val(),
        investigation: $("#investigation").val(),
        medicine: $("#medicine").val(),
        nature: $("#nature").val(),
        perception: $("#perception").val(),
        performance: $("#performance").val(),
        persuasion: $("#persuasion").val(),
        religion: $("#religion").val(),
        sleightOfHand: $("#sleight_of_hand").val(),
        stealth: $("#stealth").val(),
        survival: $("#survival").val(),
        personalityTraits: $("#personality_traits").val(),
        ideals: $("#ideals").val(),
        bonds: $("#bonds").val(),
        flaws: $("#flaws").val(),
        featuresAndTraits: $("#features_and_traits").val(),
        weapon: $("#weapon").val(),
        attackBonus: $("#attack_bonus").val(),
        damage: $("#damage").val(),
        damageType: $("#damage_type").val(),
        spellName: $("#spell_name").val(),
        spellID: $("#spell_id").val(),
        spellType: $("#spell_type").val(),
        spellLevel: $("#spell_level").val(),
        castingTime: $("#casting_time").val(),
        spellRange: $("#spell_range").val(),
        spellComponents: $("#spell_components").val(),
        spellDuration: $("#spell_duration").val(),
        UserId: userID
    };

    // Post new character then redirect to members page
    function updateRequest(id, character) {
        return $.ajax({
            url: "/api/characters/update/" + id,
            method: "PUT",
            data: character
        })
            .then(() => {
                alert("Character has been updated.");
                window.location.href = "/members";
            });
    };

    updateRequest(charID, updatedCharacter);
};
// Update button listener
updateCharacterButton.on("click", () => {
    updateCharacter(event);
});

