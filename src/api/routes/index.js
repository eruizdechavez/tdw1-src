'use strict';

var router = require('express').Router(),
  pkg = require('../package.json');

module.exports = function (basePath) {
  router.use(basePath, function (req, res) {
    res.send(pkg.name + '  ' + pkg.version);
  });

  return router;
};
