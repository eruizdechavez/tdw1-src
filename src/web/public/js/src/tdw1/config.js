'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: require('./home.html')
      })
      .state('login', {
        url: '/login',
        controller: 'ProfileController',
        controllerAs: 'loginCtrl',
        template: require('../profile/login.html')
      })
      .state('register', {
        url: '/register',
        controller: 'ProfileController',
        controllerAs: 'registerCtrl',
        template: require('../profile/register.html')
      })
      .state('timeline', {
        url: '/timeline',
        controller: 'TimeLineController',
        controllerAs: 'tlCtrl',
        template: require('../timeline/timeline.html')
      })
      .state('not-found', {
        url: '/not-found',
        template: require('../profile/not-found.html')
      })
      .state('profile', {
        url: '/:username',
        controller: 'ProfileController',
        controllerAs: 'profileCtrl',
        template: require('../profile/profile.html')
      })
      ;
  }
];
