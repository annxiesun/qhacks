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

app.get("/lobby*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "some.html"));
});

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    console.log("User: " + socket.id + " | joined room: " + room);
    socket.join(room);

    io.to(room).emit()
  });

  socket.on('message', (msg) => {
    var room = tools.GetLastValue(socket.rooms);

    var message = tools.GetUserName(socket.id) + ": " + msg
    io.to(room).emit("new_msg", message);
  });

  socket.on('setUser', (username, profile) => {
    tools.AddUserName(socket.id, username);
    tools.AddUserName(socket.id, profile);

    var room = tools.GetLastValue(socket.rooms);
    var clients = io.sockets.adapter.rooms.get(room);

    io.to(room).emit("userUpdate", tools.GetUsers(clients));

  });

  socket.on('startGame', () => {
    var room = tools.GetLastValue(socket.rooms);

    var clients = io.sockets.adapter.rooms.get(room);

    tools.NewGame(room, clients)
  });

  socket.on('checkAttempt', (msg) => {
    var room = tools.GetLastValue(socket.rooms);
    var game = tools.GetGame(room)

    

  });


});



httpServer.listen(port , () => {
  console.log("Server hosted on " + port);
});
