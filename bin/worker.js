'use strict';

const os = require('os');
const throng = require('throng');

function start(id) {
  // Setup

  require('../dist/server/app/server/config/objection');

  // Start

  require('../dist/server/app/server/jobs');

  console.log(`Worker ${id} is started`);
}

// Clustering

const WORKERS = process.env.NODE_ENV === 'production' ? process.env.WEB_CONCURRENCY || os.cpus().length : 1;

throng({ start, workers: WORKERS, lifetime: Infinity });
