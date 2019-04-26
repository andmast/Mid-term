//this file is for the routes using knex and postgres to update the database
//* equals which table we are looking at and which
"use strict";

const express = require('express');
const router  = express.Router();
const wolfApi = require ('../public/scripts/wolf-api.js');

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
      .select("items.id", "what", "completed", "userID", "categoryID", "name")
      .from("items")
      .leftJoin('categories', 'categories.id', 'items.categoryID')
      .orderBy('items.id')
      .then((results) => {
        // console.log('results: ',results);
        res.json(results);
    });
  });



  // create/post a new item in the list page -- replaced with AJAX code
  router.post("/list/items", (req, res) => {

    // read the content in the input area and create new item in data base --> in app.js
    // with the name of the thing, query the name through the categorizer

    const what = req.body.newItem;
    let categoryID;

    console.log('req.body: ', req.body);
    console.log('req.body.newItem: ', req.body.newItem);

    wolfApi.categorizer(what, (error, result) =>{
      if (!error) {
        console.log("Success",result.category, result.type);
        categoryID = result.category;
      } else if (error === "No datatypes") {
        console.log("Search returned nothing",error, "Category =","Uncategorized");
        categoryID = 'Uncategorized';
      } else {
        console.log("ERROR",error);
        throw error;
      }

      console.log('categoryID: ', categoryID);
      // and put that inside category field
      knex('items')
        .insert([{'what': what, completed: 'false', userID: 1, 'categoryID': categoryID}])
        .then((results) => {
          res.json(results);
          res.send("It's Ok!!!");
      // render everything again/load items again --> in app.js
        });
    });
  });



/////////////LETICIA - END - CREATE BUTTON/////////////

router.delete("/", (req, res) => {
    console.log("started", req.body.itemId);
    knex('items')
      .where('id', req.body.itemId)
      .del()
      .then(() => res.send("Ok"))

});






//////////////////sahanah - edit///////////////////////


  router.get("/list/items/:itemId/edit", (req, res) => {

      knex
        .select("*")
        .from("items")
        .where("items.id", req.params.itemId)
        .leftJoin("categories", "categories.id", "items.categoryID")
        .then((results) => {

          console.log(results);

          let templateVars = {
            'itemName': results[0].what,
            'catName': results[0].name,
            'itemId': results[0].id
          }

          res.render("items", templateVars);
        });

   });

  router.post("/list/items/:itemId/edit", (req, res) => {

    console.log("update");
    console.log("itemID", req.params.itemId);
    console.log("newCatID", req.body.categories);
    console.log("itemName", req.body.newName);

    knex("items")
      .where("id", req.params.itemId)
      .update({categoryID: req.body.categories, what: req.body.newName})
      .then(() => res.redirect('/list')).catch(()=> console.log('err'));
  });

  return router;
};
