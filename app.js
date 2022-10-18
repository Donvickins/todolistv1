const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const router = require(`${__dirname}/Routes/router`)
const connectDB = require(`${__dirname}/DataBaseConnection/connectDB`);
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("render"));

connectDB();

app.use('/', router);

app.listen(PORT, function () {
  console.log(`Server Started on port ${PORT}`);
});