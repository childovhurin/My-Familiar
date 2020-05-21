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
    console.log("params: " + req.params.charID)
    db.RpgCharacter.findAll({
      where: {
        id: req.query.charid
      }
    })
      .then((data) => {
        // let characterData = JSON.stringify(data);
        // let parsedData = data[0];
        console.log("this is the character Data: ", data[0].dataValues);
        // const someObject = {
        //   test: "this is a test"
        // }
        res.render("view-character", data[0].dataValues);
      });
  });

    // // Route for loading character to view-character.handlebars
    // app.get("/api/characters/:charID", (req, res) => {
    //   console.log("params: " + req.params.charID)
    //   db.RpgCharacter.findAll({
    //     where: {
    //       id: req.params.charID
    //     }
    //   })
    //     .then((data) => {
    //       // let characterData = JSON.stringify(data);
    //       // let parsedData = data[0];
    //       console.log("this is the character Data: ", data[0].dataValues);
    //       // const someObject = {
    //       //   test: "this is a test"
    //       // }
    //       res.render("view-character", data[0].dataValues);
    //     });
    // });

  // Route for creating a new character
  app.post("/api/characters", (req, res) => {
    db.RpgCharacter.create(req.body)
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
      })
  })
};