'use strict';

var angular = require('angular');

var users = {
  asd: {
    username: 'asd',
    email: 'erick@erch.co',
    password: 'asd'
  }
};

angular
  .module('mocks', ['ngMockE2E'])
  .run(['$httpBackend',
    function ($httpBackend) {

      $httpBackend
        .whenPOST('/api/users')
        .respond(function (method, url, data) {
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

      $httpBackend
        .whenGET(/\/api\/users\/[a-z0-9]+$/i)
        .respond(function (method, url) {
          var parts = url.split('/'),
            username = parts[parts.length - 1];

          if (!users[username]) {
            return [404];
          }

          return [200, users[username]];
        });

      $httpBackend
        .whenPOST('/login')
        .respond(function (method, url, data) {
          var user = JSON.parse(data);

          if (!users[user.username]) {
            return [404];
          }

          if (users[user.username].password !== user.password) {
            return [401];
          }

          return [201];
        });

      $httpBackend
        .whenPUT(/\/api\/users\/[a-z0-9]+$/i)
        .respond(function (method, url, data) {
          var parts = url.split('/'),
            username = parts[parts.length - 1];

          if (!users[username]) {
            return [404];
          }

          users[username] = JSON.parse(data);

          return [204];
        });

      $httpBackend
        .whenDELETE(/\/api\/users\/[a-z0-9]+$/i)
        .respond(function (method, url) {
          var parts = url.split('/'),
            username = parts[parts.length - 1];

          if (!users[username]) {
            return [404];
          }

          delete users[username];

          return [204];
        });
    }
  ]);
