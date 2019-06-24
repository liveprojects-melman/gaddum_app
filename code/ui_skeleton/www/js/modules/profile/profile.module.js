(function(){
  'use strict';

  angular.module('gaddum.profile', [
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
