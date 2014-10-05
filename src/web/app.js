'use strict';

var express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  app = express(),
  config = require('indecent');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals = {
    host: config.host,
    basePath: config.basePath
  };
  next();
});

app.use('/', function (req, res) {
  res.render('index');
});

app.listen(config.port, function() {
  console.log('Web server listening on port ' + config.port);
});
