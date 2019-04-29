
exports.up = function(knex, Promise) {
  return knex.schema.table('items', function(t) {
        t.string('data');
    });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', function(t) {
        t.dropColumn('img');
    });

};
