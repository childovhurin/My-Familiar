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
        $.get("/api/" + charID)
        .then((data) => console.log(data));
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
    Object.keys(newCharacter).forEach((stat) => {
        if (newCharacter[stat] === undefined || newCharacter[stat] === "") {
            newCharacter[stat] = 0;
        }
    });
    // Post new character then redirect to members page
    console.log(newCharacter);
    $.post("/api/characters", newCharacter)
        .then(() => {
            window.location.href = "/members";
        });
};
