
exports.up = function(knex, Promise) {
  return knex.schema
		// person
		.createTable('person', (tbl) => {
			// Primary key
			tbl.increments();

			// Fields
			tbl.string('firstName', 30).notNullable().defaultTo('n/a');
			tbl.string('lastName', 30).notNullable().defaultTo('n/a');
			tbl.string('junk', 60).notNullable().defaultTo('n/a');
		})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('person');
};
