exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('categories', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
  ])
  .then(() => knex.schema.createTable('items', function (table) {
                table.increments('id').primary();
                table.string('what');
                table.string('completed');
                table.integer('userID').unsigned();
                table.foreign('userID').references('users.id');
                table.integer('categoryID').unsigned();
                table.foreign('categoryID').references('categories.id');
  }));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items').then(() =>
    Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('categories')
    ])
  )
};
