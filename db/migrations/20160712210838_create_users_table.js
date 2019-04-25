//create migration table as per exercise or users table

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
  });
};

//do opposite of what is above (undos)

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};


  // development: {
  //   client: 'postgresql',
  //   connection: {
  //     host     : process.env.DB_HOST,
  //     user     : process.env.DB_USER,
  //     password : process.env.DB_PASS,
  //     database : process.env.DB_NAME,
  //     port     : process.env.DB_PORT,
  //     ssl      : process.env.DB_SSL
  //   },
