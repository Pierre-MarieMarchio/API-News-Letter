// ****** Pakages ****** //

require("dotenv").config({ path: "./env/.env" });

const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");

// ****** Varriables ****** //

const app = express();
const API_Key = process.env.API_KEY;
const audience_ID = process.env.AUDIENCE_ID;

// ****** Server ****** //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "public", "html", "index.html"));
});

app.post("/", (req, res) => {
  var Subscribers = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
  };

  var data = {
    members: [
      {
        email_address: Subscribers.email,
        status: "subscribed",
        merge_fields: {
          FNAME: Subscribers.firstName,
          LNAME: Subscribers.lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = `https://us14.api.mailchimp.com/3.0/lists/${audience_ID}`;

  options = {
    method: "POST",
    auth: `user:${API_Key}`,
  };

  const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
      
      res.sendFile(path.join(__dirname, ".", "public", "html", "success.html"));
      
    } else {
      res.sendFile(path.join(__dirname, ".", "public", "html", "failure.html"));
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/")
})


app.listen("3000", () => {
  console.log("server running on port : 3000");
});
