'use strict';

var md5 = require('md5'),
  alertify = require('alertify');

module.exports = ['$state', '$stateParams', 'ProfileFactory',
  function ($state, $stateParams, ProfileFactory) {
    this.user = {
      username: 'erickrdch',
      email: 'erick@erch.co',
      password: '123456',
      confirmPassword: '123456'
    };

    this.register = function (user) {

      ProfileFactory
        .register(user)
        .success(function () {
          $state.go('profile', {
            username: user.username
          });
        })
        .error(function (data, status, headers) {
          console.log('err', data, status, headers('x-error-code'));
          var message = '';

          if (status === 400) {
            return;
          }

          if (status === 409) {
            message = 'El ';

            if (+headers('x-error-code') === 2) {
              message += 'nombre de usuario ';
            } else {
              message += 'correo electronico ';
            }

            message += 'ya esta en uso, por favor usa uno diferente.';
          }

          alertify.alert(message);
        });
    };

    this.login = function (user) {
      ProfileFactory
        .login(user)
        .success(function() {
          $state.go('profile', {username: user.username});
        })
        .error(function(data, status) {
          if (status === 404) {
            return alertify.alert('Usuario no registrado.');
          }

          if (status === 401) {
            return alertify.alert('Nombre de usuario o contraseña incorrecta.');
          }
        });
    };

    this.loadUser = function (username) {
      ProfileFactory
        .loadUser(username)
        .success(function(data) {
          this.user = data;
        }.bind(this))
        .error(function(data, status) {
          console.log('error', status);
        });
    };

    this.pictureUrl = function (email) {
      return '//www.gravatar.com/avatar/' + md5(email) + '?s=150';
    };

    if ($stateParams.username) {
      this.loadUser($stateParams.username);
    }
  }
];
