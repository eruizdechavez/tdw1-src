'use strict';
var mongoose = require('mongoose'),
  redis = require('redis');

exports.mongoose = mongoose.connect('mongodb://localhost/tdw1');
exports.redis = redis.createClient();
