'use strict';

let app = require('../dist/server/app/server/app').app;

app.listen(process.env.PORT || 8000);
