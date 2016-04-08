exports.up = knex => knex.schema.createTable('forms', table => {
  table.bigincrements('id').primary();
  table.string('name').notNullable();
  table.string('key').unique().notNullable();
  table.string('redirect_to');
  table.boolean('notify_me').defaultTo(true);
  table.biginteger('user_id').unsigned().references('id').inTable('users').notNullable();
  table.string('created_at').notNullable();
  table.string('updated_at').notNullable();
});

exports.down = knex => {
  return knex.schema.dropTable('forms');
};
