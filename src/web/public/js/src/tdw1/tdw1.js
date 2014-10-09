// Angularify Module.
// You can create your own module for your application and use this one as
// an example on how to make basic wiring.

'use strict';

var angular = require('angular');

require('../profile/profile');
require('../timeline/timeline');

angular
  .module('tdw1', ['profile', 'timeline'])
  .config(require('./config'))
  .directive('navBar', require('./nav-bar-directive'));
