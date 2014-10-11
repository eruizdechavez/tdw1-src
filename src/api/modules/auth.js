'use strict';

var auth = require('basic-auth'),
  UserModel = require('../models/user');

module.exports = function (req, res, next) {
  // Get basic auth data from request
  var user = auth(req);

  // Ask the model if data is valid
  UserModel.checkCredentials(user, function (err, user) {
    // If we have an error with a code, return it
    if (err && err.code) {
      return res.send(err.code).end();
    }

    // If something else broke, notity
    if (err) {
      console.log(err);
      return res.send(500).end();
    }

    // Add user data to request for later usage
    req.user = user;

    // Next!
    return next();
  });
};
