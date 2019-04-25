// FOR WHEN DATA NEEDS TO COME FROM JSON FILE SOMEWHERE
// const userData = require(‘../../../data/user’);
// const categoryData = require(‘../../../data/category’);
// const itemData = require(‘../../../data/items’);

exports.seed = function (knex, Promise) {
  return knex('items').del()
    .then(() => knex('users').del())
    .then(() => knex('categories').del())
    .then(() => Promise.all([
      knex('users').insert([{id: 1, email: 'a@b.com', password: '123'},
                            {id: 2, email: 'b@c.com', password: '123'},
                            {id: 3, email: 'c@d.com', password: '123'}]),
      knex('categories').insert([{id: 1, name: 'To Watch'},
                                 {id: 2, name: 'To Eat'},
                                 {id: 3, name: 'To Read'},
                                 {id: 4, name: 'To Buy'},
                                 {id: 5, name: 'Uncategorized'}])
    ]))
    .then((users, categories) => Promise.all([
      knex('items').insert([{what: 'Frozen', completed: 'true', userID: 1, categoryID: 1},
                            {what: 'Starbucks', completed: 'false', userID: 2, categoryID: 2},
                            {what: 'Bible', completed: 'false', userID: 3, categoryID: 3},
                            {what: 'Macbook', completed: 'true', userID: 1, categoryID: 4},
                            {what: 'Stick', completed: 'false', userID: 2, categoryID: 5}
                            ])
    ]))
}


