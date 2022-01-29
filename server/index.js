const express = require("express");
const nodemailer = require("nodemailer");
var cors = require('cors');
var tools = require('./tools');
const app = express();
require("dotenv").config();

app.use(cors());

const path = require("path");
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "..", "build")));



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/newLobby", (req, res) => {
  res.send(tools.GenerateLobbyUrl());
});

app.get("/user/*", (req, res) => {
  res.send(tools.GenerateLobbyUrl());
});




app.get("/lobby*", (req, res) => {
   console.log(req.path)
  res.sendFile(path.join(__dirname, "..", "build", "some.html"));
});

const sendRoute = encodeURI("/send");
app.post(sendRoute, function (req, res) {

});

app.listen(port , () => {
  console.log("Server hosted on " + port);
});
