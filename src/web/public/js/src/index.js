'use strict';

var angular = require('angular');

require('./tdw1/tdw1');
require('./mocks');

angular.module('app', ['mocks', 'ui.bootstrap', 'ui.router', 'tdw1']);
