'use strict';

var angular = require('angular');

angular.module('profile', [])
  .controller('ProfileController', require('./profile-controller'))
  .factory('ProfileFactory', require('./profile-factory'));
