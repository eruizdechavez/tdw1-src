'use strict';

module.exports = ['$http',
  function ($http) {
    return {
      register: function (user) {
        return $http({
          method: 'post',
          url: '/api/users',
          data: user
        });
      },

      loadUser: function(username) {
        return $http({
          url: '/api/users/' + username
        });
      },

      login: function(user) {
        return $http({
          method: 'post',
          url: '/login',
          data: user
        });
      }
    };
  }
];
