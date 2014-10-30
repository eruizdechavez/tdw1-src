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

  var multi = redis.multi();

  multi
    .sismember('users:deleted', user.name)
    .get('user:password:' + user.name)
    .exec(function (err, data) {
      if (data[0]) {
        err = new Error('Not found');
        err.code = 404;
        return callback(err);
      }

      if (err) {
        return callback(err);
      }

      if (!data[1]) {
        err = new Error('Not found');
        err.code = 404;
        return callback(err);
      }

      if (data[1] !== model.hash(user.pass)) {
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
  redis.sismember('users:deleted', username, function (err, deleted) {
    if (deleted) {
      err = new Error('Not found');
      err.code = 404;
      return callback(err);
    }

    this
      .findOne({
        username: username
      })
      .select('username email -_id')
      .exec(callback);
  }.bind(this));
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

schema.statics.remove = function (username, callback) {
  redis.sadd('users:deleted', username, callback);
};

module.exports = mongoose.model('users', schema);
