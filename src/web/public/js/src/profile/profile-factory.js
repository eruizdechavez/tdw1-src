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

      update: function (user) {
        return $http({
          method: 'put',
          url: '/api/users/' + user.username,
          data: user
        });
      },

      remove: function (username) {
        return $http({
          method: 'delete',
          url: '/api/users/' + username
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
