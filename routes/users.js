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
    console.log('req.session.userId: ', req.session.userId);

    if (!req.session.userId) {
      res.status(401).send('Unauthorized').redirect('/urls');
    } else {
      knex
        .select("items.id", "what", "completed", "userID", "categoryID", "name")
        .from("items")
        .leftJoin('categories', 'categories.id', 'items.categoryID')
        .where('userID', req.session.userId)
        .orderBy('items.id')
        .then((results) => {
          console.log('results: ',results);
          res.json(results);
      });
    }

  });

  // select * from "items" left join "categories" on "categories"."id" = "items"."categoryID" where "userID" = 1 order by "items"."id";


  // create/post a new item in the list page -- replaced with AJAX code
  router.post("/list/items", (req, res) => {

    const what = req.body.newItem;
    let categoryID;

    console.log('req.session.userId: ', req.session.userId);
    console.log('req.body: ', req.body);
    console.log('req.body.newItem: ', req.body.newItem);

    wolfApi.categorizer(what, (error, result) =>{
      if (!error) {
        console.log("Success",result.category, result.type);
        categoryID = result.category;
      } else if (error === "No datatypes") {
        console.log("Search returned nothing",error, "Category =","Uncategorized");
        categoryID = 5;
      } else {
        console.log("ERROR",error);
        throw error;
      }

      console.log('categoryID: ', categoryID);
      // and put that inside category field
      knex('items')
        .insert([{'what': what, completed: 'false', userID: req.session.userId, 'categoryID': categoryID}])
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



router.get("/list/items/:itemId/edit", (req, res) => {
  let itemName;
  let catName;
  let templateVars;

  function editItem(itemID) {
    knex
      .select("items.id", "what", "completed", "userID", "categoryID", "name")
      .from("items")
      .leftJoin("categories", "categories.id", "items.categoryID")
      .where('userID', req.session.userId)
      .then((results) => {
       results.forEach(function(item) {
        // console.log(item);
        console.log("itemid ", item.id, "itemurl", itemID);
        if (item.id == itemID) {
          itemName = item.what;
          catName = item.name;
          templateVars = { 'itemName': itemName,
                          'catName': catName,
                          'itemId':  itemID};
          console.log(templateVars);
          }
        });
      // console.log(templateVars);
      res.render("items", templateVars);
    });
  }
editItem(req.params.itemId);
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
