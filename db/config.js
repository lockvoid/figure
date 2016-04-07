if (process.env['NODE_ENV'] !== 'production') {
  require('dotenv').config({ path: '../.env', silent: true });
}

module.exports = exports.default = {
  development: {
    client: 'postgresql',

    connection: process.env['DATABASE_URL'],

    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'postgresql',

    connection: process.env['DATABASE_URL'],

    migrations: {
      tableName: 'migrations'
    }
  }
}
