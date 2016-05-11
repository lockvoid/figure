exports.up = knex => knex.schema.table('forms', t => {
  t.string('webhook_url');
});

exports.down = knex => knex.schema.table('forms', t => {
  t.dropColumn('webhook_url');
});
