const express = require("express");
const nodemailer = require("nodemailer");
var cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());

const path = require("path");
const port = process.env.PORT || 3000


const start = encodeURI("/");
app.use(start, express.static(path.join(__dirname, "..", "build")));
app.use(start, express.static("public"));
app.get(start, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const game = encodeURI("/lobby/*");
app.get(game,  (req, res) => {
  console.log("Lobby name");
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const sendRoute = encodeURI("/send");
app.post(sendRoute, function (req, res) {

});

app.listen(port , () => {
  console.log("Server hosted on " + port);
});
