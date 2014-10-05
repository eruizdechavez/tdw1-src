// Angularify Module.
// You can create your own module for your application and use this one as
// an example on how to make basic wiring.

'use strict';

var angular = require('angular');

angular
  .module('tdw1', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/js/src/tdw1/home.html'
        });
    }
  ])
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: '/js/src/tdw1//nav-bar.html',
      controller: ['$scope',
        function ($scope) {
          $scope.isCollapsed = true;
          $scope.toggleCollapsed = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
          };

          $scope.collapse = function () {
            if (!$scope.isCollapsed) {
              $scope.isCollapsed = true;
            }
          };
        }
      ]
    };
  });
