"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


// app.get/user/:userId/list
// app.post/user/:userId/list/items
// app.get/user/:userId/list/items/:itemID/edit
// app.delete/user/:userId/list/items/:itemID/delete

// get list page from user
app.get("/user/:userId/list", (req, res) => {

  res.render("list");
});

// create/post a new item in the list page -- replaced with AJAX code
// app.post("/user/:userId/list/items", (req, res) => {
//   // read the content in the input area and create new item in data base
//   // with the name of the thing, query the name through the categorizer
//   // generate a sequential number - check the last item number a create a new one for the Id
//   // and put that inside category field

//   // render everything again/load items again
//   res.render('list');
// });

// get/redirect user to the edit item page
app.get("/user/:userId/list/items/:itemID/edit", (req, res) => {
  // identifies in wich item the user clicked
  // and pass that as a variable to edit the item ID she clicked!
  res.redirect("items");
});

// delete item from list page
app.delete("/user/:userId/list/items/:itemID/delete", (req, res) => {
  // identifies in wich item the user clicked
  // and delete that from the data base
  // render everything again/load items again
  res.render("list");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



