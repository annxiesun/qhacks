const express = require("express");
const nodemailer = require("nodemailer");
var cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());

const path = require("path");
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/lobby*", (req, res, next) => {
   
  res.sendFile(path.join(__dirname, "..", "build", "some.html"));
});

const sendRoute = encodeURI("/send");
app.post(sendRoute, function (req, res) {

});

app.listen(port , () => {
  console.log("Server hosted on " + port);
});
