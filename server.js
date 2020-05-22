// Requiring necessary npm packages
const http = require("http");
var express = require("express");
var session = require("express-session");
var app = express();

// Requiring passport as we've configured it
var passport = require("./config/passport");
const path = require("path");

// Requiring IO and formatting for chat messages
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
const server = http.createServer(app);
const io = socketio(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//Requiring handlebars and setting it as the engine
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Bot that makes announcements in chat room
const botName = 'GameBot';

// IO connection for chat
io.on('connection', socket => {
  console.log('New WS connection');
  //listen for username
  socket.on('newUser', (newUser) => {
      console.log(newUser);

      //welcome current user
      socket.emit('message', formatMessage(botName, `Welcome to the game room, ${newUser}!`));
      //broadcast when a user connects
      socket.broadcast.emit('message', formatMessage(botName, 'A user has entered the chat!'));

      //listen for chatMessage
      socket.on('chatMessage', (message) => {
          io.emit('message', formatMessage(newUser, message));
      });
  });

  //runs when client disconnects
  socket.on('disconnect', () => {
      io.emit('message', formatMessage(botName, 'A user has left the chat.'))
  });
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});