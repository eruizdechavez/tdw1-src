'use strict';

var md5 = require('md5');

module.exports = function () {
  this.posts = [{
    username: 'erickrdch',
    email: 'erick@erch.co',
    text: 'hello world'
  }, {
    username: 'coolguy',
    email: 'coolguy@example.com',
    text: 'howdy!'
  }];

  this.pictureUrl = function(email) {
    return '//www.gravatar.com/avatar/' + md5(email) + '?s=50';
  };
};
