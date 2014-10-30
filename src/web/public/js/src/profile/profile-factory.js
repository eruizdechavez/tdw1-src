'use strict';

module.exports = ['$http',
  function ($http) {
    return {

      setUser: function (user) {
        sessionStorage.setItem('tdw1:user', JSON.stringify(user));
      },

      getUser: function () {
        var user = sessionStorage.getItem('tdw1:user');

        if (user) {
          user = JSON.parse(user);
        } else {
          user = {};
        }

        return user;
      },

      register: function (user) {
        return $http({
          method: 'post',
          url: '/api/users',
          data: user
        });
      },

      update: function (data, user) {
        return $http({
          headers: {
            Authorization: 'Basic ' + window.btoa(user.username + ':' + user.password)
          },
          method: 'put',
          url: '/api/users/' + user.username,
          data: data
        });
      },

      remove: function (user) {
        return $http({
          headers: {
            Authorization: 'Basic ' + window.btoa(user.username + ':' + user.password)
          },
          method: 'delete',
          url: '/api/users/' + user.username
        });
      },

      loadUser: function (username, user) {
        return $http({
          headers: {
            Authorization: 'Basic ' + window.btoa(user.username + ':' + user.password)
          },
          url: '/api/users/' + username
        });
      }
    };
  }
];
