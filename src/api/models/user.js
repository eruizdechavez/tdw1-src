'use strict';

var mongoose = require('mongoose'),
  crypto = require('crypto'),
  config = require('indecent'),
  ok = require('okay'),
  Schema = mongoose.Schema,
  redis = require('../modules/dataSources').redis;

var schema = new Schema({
  username: {
    type: String,
    index: {
      unique: true
    },
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    index: {
      unique: true
    },
    lowercase: true,
    trim: true
  }
});

schema.statics.list = function (callback) {
  this
    .find()
    .select('username email -_id')
    .exec(callback);
};

schema.statics.hash = function (pass) {
  var shasum = crypto.createHash('sha256');
  shasum.update(pass + config.salt);
  return shasum.digest('base64');
};

schema.statics.checkCredentials = function (user, callback) {
  var model = this;

  if (!user || !user.name || !user.pass) {
    var err = new Error('Bad request');
    err.code = 400;
    return callback(err);
  }

  redis.get('user:password:' + user.name, function (err, pass) {
    if (err) {
      return callback(err);
    }

    if (!pass) {
      err = new Error('Not found');
      err.code = 401;
      return callback(err);
    }

    if (pass !== model.hash(user.pass)) {
      err = new Error('Wrong password');
      err.code = 401;
      return callback(err);
    }

    return model.findByUsername(user.name, callback);
  });
};

schema.statics.register = function (data, callback) {
  var user = new this({
    username: data.username.toLowerCase().trim(),
    email: data.email.toLowerCase().trim()
  });

  redis.set('user:password:' + user.username, this.hash(data.password), ok(callback, function () {
    user.save(ok(callback, function () {
      callback(null, {
        username: user.username,
        email: user.email
      });
    }));
  }));
};

schema.statics.findByUsername = function (username, callback) {
  this
    .findOne({
      username: username
    })
    .select('username email -_id')
    .exec(callback);
};

schema.statics.update = function (username, data, callback) {
  this.findOne({
    username: username
  }, ok(callback, function (user) {

    if (data.email) {
      user.email = data.email.toLowerCase().trim();
    }

    user.save(callback);
  }));
};

module.exports = mongoose.model('users', schema);
