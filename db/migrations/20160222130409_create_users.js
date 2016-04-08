exports.up = knex => knex.schema.createTable('users', table => {
  table.bigincrements('id').primary();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.string('name');
  table.string('created_at').notNullable();
  table.string('updated_at').notNullable();
});

exports.down = knex => {
  return knex.schema.dropTable('users');
};
