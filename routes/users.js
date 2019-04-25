//this file is for the routes using knex and postgres to update the database
//* equals which table we are looking at and which
"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });


/////////////LETICIA - CREATE BUTTON/////////////

// get list page from user - items contents
  router.get("/list/items", (req, res) => {
    knex
      .select("*")
      .from("items")
      .leftJoin('categories', 'categories.id', 'items.categoryID')
      .then((results) => {
        console.log('results: ',results);
        res.json(results);
    });
  });


  // create/post a new item in the list page -- replaced with AJAX code
  router.post("/list/items", (req, res) => {
    // read the content in the input area and create new item in data base --> in app.js
    const input = req.body;
    console.log('input: ', input);
    // with the name of the thing, query the name through the categorizer

    // and put that inside category field
    // knex('items')
    //   .insert(req.body)
    //   .then((results) => {
    //     res.json(results);
    //   });

    // render everything again/load items again --> in app.js
    console.log('req.body: ', req.body);
    res.send("It's Ok!!!");
  });


/////////////LETICIA - END - CREATE BUTTON/////////////










  return router;
};
