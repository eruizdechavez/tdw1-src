'use strict';

var router = require('express').Router(),
  pkg = require('../package.json'),
  users = require('./users');

router.use('/users', users);

router.get('/', function (req, res) {
  res.send(pkg.name + '  ' + pkg.version);
});

module.exports = router;
