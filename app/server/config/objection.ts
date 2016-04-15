import * as knex from 'knex';

import { Model } from 'objection';

const config = require('../../../../../db/config');

Model.knex(knex(config[process.env.NODE_ENV || 'development']));
