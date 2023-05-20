const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "public", "html", "index.html"));
});

app.post("/", (req, res) => {
  
  var Subscribers = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email
  };
  console.log(Subscribers);
});

app.listen("3000", (req, res) => {
  console.log("listening on http://localhost 3000");
});
