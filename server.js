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


function findUser(email) {
  return new Promise (function(resolve, reject){
    let results;

    knex
        .select('*')
        .returning('id')
        .from('users')
        .where('email', email)
        .then((id) => {
          console.log('results from findUser: ',id[0]);
          results = id[0];
          return resolve(results);
        })
        .catch(error => reject(error));
      });
}

function findEmail(userId) {
  return new Promise (function(resolve, reject){
    let results;

    knex
        .select('*')
        .returning('id')
        .from('users')
        .where('id', userId)
        .then((email) => {
          console.log('results from findEmail: ',email[0]);
          results = email[0];
          return resolve(results);
        })
        .catch(error => reject(error));
      });
}


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
  findEmail(req.session.userId)
    .then(userData => {
      const templateVars = {  'userId': req.session.userId,
                              'email': userData.email,
                            };
      console.log('templateVars: ',templateVars);
      res.render("list", templateVars);
    })
    .catch(error => res.status(403).send(error));
});



// Login Page
app.get("/login", (req, res) => {
  if (!req.session.userId) {
    console.log("rendering login");
    return res.render('login');
  } else {
    console.log("redirect login");
    res.redirect('/list');
  }
});


//log in and send the form
app.post('/login', (req, res, next) => {

  findUser(req.body.email)
    .then(userData => {
      if (userData === undefined){
          res.redirect("/register");
      } else if (userData.email === req.body.email && bcrypt.compareSync(req.body.password, userData.password)){
          req.session.userId = userData.id;
          console.log('userData.id: ',userData.id);
          res.redirect('/list');
      } else {
          return res.status(403).send('The email address or password you entered is not valid.');
      }
    })
    .catch(error => res.status(403).send(error));
});


// Logout Page
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/');
});


//register page! --> OK!
app.get('/register', (req, res) => {
  if (!req.session.userId) {
    res.render('register');
  } else {
    res.redirect('/list');
  }
});


//registering! --> SOLVE THAT --> it finds the email, but it is not stopping!
app.post('/register', (req, res, next) => {
  const email = req.body.email;
  const password = hasher(req.body.password);
  console.log('email ',email);
  console.log('password ', password);

  findUser(email)
    .then(userData => {
      if (!email || !password) {
        // return res.status(400).send('missing id or password');
        throw ('Missing email or password');
      } else if (findUser(email)) {
        console.log('findUser(email): ',findUser(email));
        // return res.status(400).send('Already registered');
        throw ('Already registered');
      } else {
        knex('users')
            .returning('id')
            .insert([{'email': email, 'password': password}])
            .then((id) => {
              console.log('results from register: ',id);
              req.session.userId = id[0];
              req.session.userEmail = email;
              res.redirect('/list');
            });
      }
    })
    .catch(error => res.status(403).send(error));
});


// get/redirect user to the edit item page
app.get("/items/:itemID", (req, res) => {
  // identifies in wich item the user clicked
  // and pass that as a variable to edit the item ID she clicked!
  res.redirect("items");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
