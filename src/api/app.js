'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  config = require('indecent'),
  router = require('./routes');

require('./modules/dataSources');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(router('/'));

app.listen(config.port, function() {
  console.log('API server listening on port ' + config.port);
});
