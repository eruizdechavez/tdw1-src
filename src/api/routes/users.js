'use strict';

var router = require('express').Router(),
  UserModel = require('../models/user'),
  auth = require('../modules/auth');

router.post('/', function (req, res) {
  var required = ['username', 'email', 'password'],
    missing = [];

  // Check for missing fields
  required.forEach(function (field) {
    if (!req.body[field]) {
      missing.push(field);
    }
  });

  // Fail if something is missing
  if (missing.length) {
    return res
      .status(400)
      .header('x-error-code', 1)
      .header('x-error-message', missing.join(','))
      .send();
  }

  UserModel.register(req.body, function (err) {
    if (err) {
      // Error de indice duplicado en Mongo
      if (err.code === 11000 && err.err.indexOf('username') >= 0) {
        return res
          .status(409)
          .header('x-error-code', 2)
          .send();
      }

      // Error de indice duplicado en Mongo
      if (err.code === 11000 && err.err.indexOf('email') >= 0) {
        return res
          .status(409)
          .header('x-error-code', 3)
          .send();
      }

      return res.status(500).send();
    }

    res.status(201).send();
  });
});

router.get('/:username', auth, function (req, res) {
  UserModel.findByUsername(req.params.username, function (err, data) {
    if (err) {

      if (err.code === 404) {
        return res.status(404).end();
      }

      return res.status(500).end();
    }

    if (!data) {
      return res.status(404).end();
    }

    res.send(data);
  });
});

router.put('/:username', auth, function (req, res) {
  if (req.params.username.toLowerCase() !== req.user.username) {
    return res.status(403).end();
  }

  UserModel.update(req.user.username, req.body, function (err) {
    if (err) {
      if (err.code === 11000 && err.err.indexOf('email') >= 0) {
        return res
          .status(409)
          .header('x-error-code', 3)
          .send();
      }

      console.log(err);
      return res.status(500).end();
    }

    return res.status(204).end();
  });
});

router.delete('/:username', auth, function (req, res) {
  if (req.params.username.toLowerCase() !== req.user.username) {
    return res.status(403).end();
  }

  UserModel.remove(req.params.username.toLowerCase(), function() {
    return res
      .status(204)
      .end();
  });
});

module.exports = router;
