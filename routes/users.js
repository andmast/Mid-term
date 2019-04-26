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

  router.delete("/", (req, res) => {
    console.log("started");
    knex.transaction(function(trx) {
      knex('items').transacting(trx).where("id",6)
        .then(console.log)
        .then(trx.commit)
        // .catch(trx.rollback);
    })
    .then(function(resp) {
      console.log('Transaction complete.');
    })
    .catch(function(err) {
      console.error(err);
    }).finally(()=> res.send("ok"));
    // console.log("delete")
    // knex('items')
    //   .where('id', 1)
    //   .del().then(console.log)
    //   res.send("ok")
  });

  return router;
};
