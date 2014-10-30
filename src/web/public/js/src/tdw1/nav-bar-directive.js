'use strict';

module.exports = function () {
  return {
    restrict: 'E',
    template: require('./nav-bar.html'),
    controller: ['$scope', 'ProfileFactory', '$state',
      function ($scope, ProfileFactory, $state) {
        $scope.isCollapsed = true;
        $scope.toggleCollapsed = function () {
          $scope.isCollapsed = !$scope.isCollapsed;
        };

        $scope.collapse = function () {
          if (!$scope.isCollapsed) {
            $scope.isCollapsed = true;
          }
        };

        $scope.isLoggedIn = function () {
          var user = ProfileFactory.getUser();

          return !!user.username;
        };

        $scope.logout = function() {
          ProfileFactory.setUser({});
          $state.go('home');
        };
      }
    ]
  };
};
