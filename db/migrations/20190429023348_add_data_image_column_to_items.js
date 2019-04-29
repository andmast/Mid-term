
exports.up = function(knex, Promise) {
  return knex.schema.table('items', function(t) {
        t.string('img');
    });

};

exports.down = function(knex, Promise) {
   return knex.schema.table('items', function(t) {
        t.dropColumn('img');
    });

};
