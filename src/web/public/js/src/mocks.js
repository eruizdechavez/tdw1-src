'use strict';

var angular = require('angular');

var users = {
  erickrdch: {
    username: 'erickrdch',
    email: 'erick@erch.co',
    password: '123456'
  }
};

angular
  .module('mocks', ['ngMockE2E'])
  .run(['$httpBackend',
    function ($httpBackend) {

      $httpBackend.whenPOST('/api/users').respond(function (method, url, data) {
        var user = JSON.parse(data);

        if (users[user.username]) {
          return [409, null, {
            'x-error-code': 2
          }];
        }

        users[user.username] = user;

        return [201, JSON.stringify({
          username: user.username
        })];
      });

      $httpBackend.whenGET(/\/api\/users\/[a-z0-9]+$/i).respond(function (method, url) {
        var parts = url.split('/'),
          username = parts[parts.length - 1];

        if (!users[username]) {
          return [404];
        }

        return [200, users[username]];
      });

      $httpBackend.whenPOST('/login').respond(function(method, url, data) {
        var user = JSON.parse(data);

        if (!users[user.username]) {
          return [404];
        }

        if (users[user.username].password !== user.password) {
          return [401];
        }

        return [200];
      });

    }
  ]);
