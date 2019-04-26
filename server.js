"use strict";

require('dotenv').config();

const PORT           = process.env.PORT || 8080;
const ENV            = process.env.ENV || "development";
const express        = require("express");
const cookieSession  = require('cookie-session');
const bodyParser     = require("body-parser");
const sass           = require("node-sass-middleware");
const app            = express();
const bcrypt         = require('bcrypt'); // to encrypt code


const knexConfig     = require("./knexfile");
const knex           = require("knex")(knexConfig[ENV]);
const morgan         = require('morgan');
const knexLogger     = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes    = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['Smart is the way'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

/////////////////////////FUNCTIONS/////////////////////////





function hasher(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}


/////////////////////////ROUTES/////////////////////////

// Home page
app.get("/", (req, res) => {
  res.render("home");
});


// Main List Page
app.get("/list", (req, res) => {
  console.log('Getting the list page...');
  res.render("list");
});


// // Login Page
// app.get("/login", (req, res) => {
//   if (!req.session.user_id) {
//     return res.render('urls_login');
//   } else {
//     res.redirect('/urls');
//   }
// });


// //log in and send the form
// app.post('/login', (req, res, next) => {

//   const user = findUser(req.body.user_email);

//   if (user && bcrypt.compareSync(req.body.password, user.password)) {
//     req.session.user_id = user.id;
//     res.redirect('/list');
//   } else {
//     res.status(403).send('The email address or password you entered is not valid.');
//   }
// });


// // Logout Page
// app.get("/logout", (req, res) => {
//   req.session = null;
//   res.redirect('/');
// });


//register page!
app.get('/register', (req, res) => {
  // if (!req.session.user_id) {
    res.render('register');
  // } else {
    // res.redirect('/');
  // }
});


//registering!
app.post('/register', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = { 'email': email, 'password': hasher(password)};
  console.log('email ',email);
  console.log('password ', password);

  // if (!email || !password) {
  //   return res.status(400).send('missing id or password');
  // }

  // if (findUser(email)) {
  //   return res.status(400).send('Already registered');
  // }

  knex('users')
      .returning('id')
      .insert([{'email': email, 'password': password}])
      .then((id) => {
        console.log('results from register: ',id);
        req.session.userId = id;
        res.redirect('/list');
      });
});



// get/redirect user to the edit item page
app.get("/items/:itemID", (req, res) => {
  // identifies in wich item the user clicked
  // and pass that as a variable to edit the item ID she clicked!
  res.redirect("items");
});

app.delete("/items/:itemId/delete", (req, res) => {
  res.render("list");
});

// app.get("/list/items/:itemId", (req, res) => {
//  res.render("items");
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
