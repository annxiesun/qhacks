const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
var cors = require('cors');
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { });
var tools = require('./tools');
require("dotenv").config();

const path = require("path");
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "..", "build")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


io.on('connection', (socket) => {
  socket.on('join', (uniqueID, room) => {
    console.log("User: " + socket.id + " | joined room: " + room);
    socket.join(room);

    var clients = tools.GetUsersIds();

    console.log(tools.GetLobby(clients));

    io.to(room).emit("userUpdate", tools.GetLobby(clients));
  });

  socket.on('message', (msg) => {
    var room = tools.GetLastValue(socket.rooms);

    var message = tools.GetUserName(socket.id) + ": " + msg
    io.to(room).emit("new_msg", message);
  });

  socket.on('setUser', (uniqueID, username, profile) => {
    console.log("SET")
    tools.AddUserName(uniqueID, username);
    tools.AddProfilePhoto(uniqueID, profile);
    tools.SetUpLives(uniqueID);
    tools.AddUser(uniqueID);

  });

  socket.on('startGame', () => {
    var room = tools.GetLastValue(socket.rooms);

    var clients = io.sockets.adapter.rooms.get(room);

    tools.NewGame(room, clients)
  });

  socket.on('checkAttempt', (msg) => {
    var room = tools.GetLastValue(socket.rooms);
    var game = tools.GetGame(room)

    if (game.IsPlayerValid(socket.id)) {
        if (game.isAnswerValid(socket)) {
            var new_player = game.nextPlayer();
            socket.to(room).emit("correctAnswer", msg, new_player);
        } else {
            socket.to(socket.id).emit("wrongAnswer")
        }
    }
  });
});



httpServer.listen(port , () => {
  console.log("Server hosted on " + port);
});
