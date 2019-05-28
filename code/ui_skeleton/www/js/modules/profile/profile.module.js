(function(){
  'use strict';

  angular.module('profile', [
    'ui.router',
    'ngAnimate'
  ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('profile', {
          cache:false,
          url: '/main/profile'
        });
    });
})();
