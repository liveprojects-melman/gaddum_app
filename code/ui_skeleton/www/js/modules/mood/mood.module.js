(function() {
  'use strict';

  angular
    .module('gaddum.mood', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('mood', {
          cache: false,
          url: '/main/mood'
        });
    });
})();
