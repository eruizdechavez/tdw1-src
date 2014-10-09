'use strict';

module.exports = function () {
  return {
    restrict: 'E',
    template: require('./nav-bar.html'),
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
};
