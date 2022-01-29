const express = require("express");
const nodemailer = require("nodemailer");
var cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});


const path = require("path");


const mainRoute = encodeURI("/");

app.use(mainRoute, express.static(path.join(__dirname, "..", "build")));
app.use(mainRoute, express.static("public"));
app.get(mainRoute, (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const sendRoute = encodeURI("/send");

app.post(sendRoute, function (req, res) {
  const { email, name, message } = req.headers;
  let mailOptions = {
    to: process.env.EMAIL,
    subject: "Message from my Website",
    text: `From: ${name}\nEmail: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
});

app.listen(process.env.PORT , () => {
  console.log(`Server is running}`);
});
