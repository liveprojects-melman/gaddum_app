(function() {
  'use strict';

  angular
    .module('gaddum.friends', [
      'ui.router',
      'ngAnimate',
      'ion-slide-box-tabs'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('friendsList', {
          cache: false,
          url: '/main/friends'
        });
    });
})();
