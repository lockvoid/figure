exports.up = knex => knex.schema.createTable('submissions', table => {
  table.bigincrements('id').primary();
  table.biginteger('form_id').unsigned().references('id').inTable('forms').notNullable();
  table.text('data').notNullable();
  table.boolean('unread').defaultTo(true).index();
  table.string('created_at').notNullable().index();
  table.string('updated_at').notNullable();
});

exports.down = knex => {
  return knex.schema.dropTable('submissions');
};

