// Gets the user ID from the query string
let userID;
let charID;

$(document).ready(function () {
    const query = window.location.search.split("=")[1]
    const firstQueryLetter = window.location.search[1];
    console.log(firstQueryLetter);
    if (firstQueryLetter === "c") {
        charID = query;
        console.log("charID:" + charID)
        // $.get("/api/" + charID)
        //     .then((data) => console.log(data));
    } else {
        userID = query;
        console.log("userID:" + userID);
    }
});
// const userID = window.location.search.split("=")[1];
const deleteCharacterButton = $("#delete_character_button");
const updateCharacterButton = $("#update_character_button")

// Route to post a new character
$("#new-character-submit").on("click", createNewCharacter);

// Create New Character and View Character buttons
$("#create-new-character").on("click", () => window.location.href = `/create-character?user_id=${userID}`);
$("#view-character").on("click", () => window.location.href = `/view-character?user_id=${userID}`);

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

    // MySQL won't allow undefined or empty strings.  This code
    //changes any undefined value or empty string to null
    // Post new character then redirect to members page
    console.log(newCharacter);
    $.post("/api/characters", newCharacter)
        .then(() => {
            window.location.href = "/members";
        });
};

// Ajax function to delete a character
const deleteCharacter = function (id) {
    console.log("this is the delete character id: " + id);
    return $.ajax({
        url: "/api/characters/" + id,
        method: "DELETE"
    })
        .then(() => {
            alert("Character has been deleted.");
            window.location.href = "/members";
        });
};

// Delete button listener
deleteCharacterButton.on("click", () => {
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
    console.log(updatedCharacter);
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
