'use strict';

const http = require('http');

// Import internal modules

const server = require('../dist/server/app/server/server');

require('../dist/server/app/server/config/objection');
require('../dist/server/app/server/config/sendgrid');

// Bootstrap internal services

const httpServer = http.createServer(server.app)
const serverPort = process.env.PORT || 7070;

httpServer.listen(serverPort, () => {
  console.log(`Server listening on: http://0.0.0.0:${serverPort}`);
});
