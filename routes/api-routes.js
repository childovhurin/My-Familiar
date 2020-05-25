// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for loading character to view-character.handlebars
  app.get("/view-character", (req, res) => {
    db.RpgCharacter.findAll({
      where: {
        id: req.query.charid
      }
    })
      .then((data) => {
        console.log("this is the character Data: ", data[0].dataValues);
        res.render("view-character", data[0].dataValues);
      });
  });

  // Route for creating a new character
  app.post("/api/characters", (req, res) => {
    let newCharacter = req.body;
    Object.keys(newCharacter).forEach((stat) => {
      if (newCharacter[stat] === undefined || newCharacter[stat] === "") {
        newCharacter[stat] = null;
      }
    });
    db.RpgCharacter.create(newCharacter)
      .then((dbCharacter) => {
        res.json(dbCharacter);
      });
  });

  // Route for getting characters by UserId
  app.get("/api/:userId", (req, res) => {
    db.RpgCharacter.findAll({
      where: {
        UserId: req.params.userId
      }
    })
      .then((allCharacters) => {
        res.json(allCharacters);
      });
  });

  // Route for getting information for one character
  app.get("/api/characters/:characterId", (req, res) => {
    console.log("CHARACTER ID: ", req.params.characterId);
    db.RpgCharacter.findAll({
      where: {
        id: req.params.characterId
      }
    })
      .then((character) => {
        console.log("THIS IS THE SINGLE CHARACTER DATA: ", character[0].dataValues);
        res.json(character[0].dataValues);
      });
  });


  // Route for deleting characters
  app.delete("/api/characters/delete/:charid", (req, res) => {
    console.log("REQ PARAMS: ", req.params)
    db.RpgCharacter.destroy({
      where: {
        id: req.params.charid
      }
    })
      .then((result) => {
        res.json(result)
      });
  });

  // Route for updating characters
  app.put("/api/characters/update/:charid", (req, res) => {
    let updatedCharacter = req.body;
    Object.keys(updatedCharacter).forEach((stat) => {
      if (updatedCharacter[stat] === undefined || updatedCharacter[stat] === "") {
        updatedCharacter[stat] = null;
      };
    });
    db.RpgCharacter.update({
      characterName: updatedCharacter.characterName,
      class: updatedCharacter.class,
      level: updatedCharacter.level,
      race: updatedCharacter.race,
      alignment: updatedCharacter.alignment,
      experiencePoints: updatedCharacter.experiencePoints,
      strength: updatedCharacter.strength,
      dexterity: updatedCharacter.dexterity,
      constitution: updatedCharacter.constitution,
      intelligence: updatedCharacter.itelligence,
      wisdom: updatedCharacter.wisdom,
      charisma: updatedCharacter.charisma,
      currentHitPoints: updatedCharacter.currentHitPoints,
      armorClass: updatedCharacter.armorClass,
      initiative: updatedCharacter.initiative,
      speed: updatedCharacter.speed,
      hitDie: updatedCharacter.hitDie,
      languages: updatedCharacter.languages,
      acrobatics: updatedCharacter.acrobatics,
      animalHandling: updatedCharacter.animalHandling,
      arcana: updatedCharacter.arcana,
      athletics: updatedCharacter.athletics,
      deception: updatedCharacter.deception,
      history: updatedCharacter.history,
      insight: updatedCharacter.insight,
      intimidation: updatedCharacter.intimidation,
      investigation: updatedCharacter.investigation,
      medicine: updatedCharacter.medicine,
      nature: updatedCharacter.nature,
      perception: updatedCharacter.perception,
      performance: updatedCharacter.performance,
      persuasion: updatedCharacter.persuasion,
      religion: updatedCharacter.religion,
      sleightOfHand: updatedCharacter.sleightOfHand,
      stealth: updatedCharacter.stealth,
      survival: updatedCharacter.survival,
      personalityTraits: updatedCharacter.personalityTraits,
      ideals: updatedCharacter.ideals,
      bonds: updatedCharacter.bonds,
      flaws: updatedCharacter.flaws,
      featuresAndTraits: updatedCharacter.featuresAndTraits,
      weapon: updatedCharacter.weapon,
      attackBonus: updatedCharacter.attackBonus,
      damage: updatedCharacter.damage,
      damageType: updatedCharacter.damageType,
      spellName: updatedCharacter.spellName,
      spellID: updatedCharacter.spellID,
      spellType: updatedCharacter.spellType,
      spellLevel: updatedCharacter.spellLevel,
      castingTime: updatedCharacter.castingTime,
      spellRange: updatedCharacter.spellRange,
      spellComponents: updatedCharacter.spellComponents,
      spellDuration: updatedCharacter.spellDuration
    }, {
      where: {
        id: req.params.charid
      }
    })
      .then((result) => {
        res.json(result);
      });
  });
};

