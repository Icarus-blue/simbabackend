"use strict";

var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require("passport");
var users = require("./routes/userRouter");
var countries = require("./routes/countryRouter");
var assumptions = require("./routes/assumptionRouter");
require('dotenv').config();
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Passport middleware
app.use(passport.initialize());

// // Passport config
require("./config/passport")(passport);

// Routing
app.use("/api/users", users);
app.use("/api/countries", countries);
app.use("/api/assumptions", assumptions);

// DB Config
var db = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(db).then(function () {
  return console.log("MongoDB successfully connected");
})["catch"](function (err) {
  return console.log('DB Connection Error: ', err);
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Server up and running on port ".concat(port, " !"));
});