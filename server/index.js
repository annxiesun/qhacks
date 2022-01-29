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


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/getNewLobby", (req, res) => {
  res.send(tools.GenerateLobbyUrl());
});

app.get("/getUserProfile/*", (req, res) => {
  var imageFile = tools.GetUserProfile(req.path) + ".png"
  res.sendFile(path.join(__dirname, "..", "build", "resources", "pfps", imageFile));
});

app.get("/lobby*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "some.html"));
});

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    console.log("User: " + socket.id + " | joined room: " + room);
    tools.ConnectUser(socket.id, room)
    socket.join(room);

    console.log("We now have the following users in room" + room);
    var users = tools.GetUsersInRoom(room);
    for (var count = 0; count < users.length; count++){
        console.log (users[count]);
    }
  });

});

httpServer.listen(port , () => {
  console.log("Server hosted on " + port);
});
