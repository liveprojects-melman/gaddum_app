(function() {
  'use strict';

  angular
    .module('gaddum.gifts', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider,$urlRouterProvider) {
      $stateProvider
        .state('giftsList', {
          cache: false,
          url: '/main/gifts'
        });
    });
})();
