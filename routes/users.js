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
        console.log('results: ',results);
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
    console.log("started");
    knex.transaction(function(trx) {
      knex('items').transacting(trx).where("id",6)
        .then(console.log)
        .then(trx.commit)
    })
    .then(function(resp) {
      console.log('Transaction complete.');
    })
    .catch(function(err) {
      console.error(err);
    }).finally(()=> res.send("ok"));
  });








//////////////////sahanah - edit///////////////////////


  router.get("/list/items/:itemID/edit", (req, res) => {
    let itemId = req.params.itemId;
    console.log(itemID);

    let itemName;
    let catName;
    let templateVars;

    knex
      .select("*")
      .from("items")
      .leftJoin("categories", "categories.id", "items.categoryID")
      .then((results) => {
        console.log("results ", results);
        items.forEach(function(item) {
          console.log("item", item)
          if (items.id === itemId) {
            itemName = items.what;
            catName = items.name;

            templateVars = {'itemName': itemName,
                            'catName':  catName  }
          }
          res.render("items", templateVars)
        })
      });
  });


  router.put("/list/items/:itemId/edit", (req, res) => {

    let nameChange = $('#newName').val();
    let newItemName;
    let newCatID;
    let newCatName;

    knex
      .select("*")
      .from("categories")
      .then((results) => {
        $('#update').on('click', function(event) {
          event.preventDefault();

          if (nameChange.length === 0 || !nameChange.trim()) {
            return alert('Enter a new item name or return to your list');
          }

          if ($('#drop-down').val() === "0") {
            return alert('Select new category or return to your list');
          }

          if ($('#drop-down').val() === "1") {
            newCatID = 1;
            newCatName = 'To Watch';
            newItemName = $('#newName').val();

          }
          res.redirect('/list', )
        })
    });
  });


  return router;
};
