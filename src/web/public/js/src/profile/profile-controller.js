'use strict';

var md5 = require('md5');

module.exports = function ($stateParams) {
  this.user = {
    username: 'erickrdch',
    email: 'erick@erch.co',
    password: '123456',
    confirmPassword: '123456'
  };

  this.register = function (user) {
    console.log('register', user);
  };

  this.login = function (user) {
    console.log('login', user);
  };

  this.loadUser = function(username) {
    console.log('loadUser', username);
  };

  this.pictureUrl = function(email) {
    return '//www.gravatar.com/avatar/' + md5(email) + '?s=150';
  };

  if ($stateParams.username) {
    this.loadUser($stateParams.username);
  }
};
