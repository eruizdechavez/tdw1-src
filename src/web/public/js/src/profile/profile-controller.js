'use strict';

var md5 = require('md5'),
  alertify = require('alertify');

module.exports = ['$state', '$stateParams', 'ProfileFactory',
  function ($state, $stateParams, ProfileFactory) {
    this.isEdit = false;

    this.user = null;

    this.register = function (user) {

      ProfileFactory
        .register(user)
        .success(function () {

          ProfileFactory.setUser({
            username: user.username,
            password: user.password
          });

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

    this.update = function (user) {
      ProfileFactory
        .update(user, ProfileFactory.getUser())
        .success(function () {
          this.isEdit = false;
        }.bind(this))
        .error(function (data, status, headers) {
          console.log('err', data, status, headers('x-error-code'));
          var message = '';

          if (status === 403) {
            message = 'No se tienen los permisos correctos para editar esta cuenta.';
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
        .loadUser(user.username, user)
        .success(function () {

          ProfileFactory.setUser({
            username: user.username,
            password: user.password
          });

          $state.go('profile', {
            username: user.username
          });
        })
        .error(function (data, status) {
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
        .loadUser(username, ProfileFactory.getUser())
        .success(function (data) {
          this.user = data;
        }.bind(this))
        .error(function () {
          $state.go('not-found');
        });
    };

    this.pictureUrl = function (email) {
      return '//www.gravatar.com/avatar/' + md5(email) + '?s=150';
    };

    this.remove = function () {
      ProfileFactory
        .remove(ProfileFactory.getUser())
        .success(function () {
          ProfileFactory.setUser({});
          $state.go('home');
        })
        .error(function () {
          console.log('remove error');
        });
    };

    this.canUpdate = function(username) {
      return username === ProfileFactory.getUser().username;
    };

    if ($stateParams.username) {
      this.loadUser($stateParams.username);
    }
  }
];
