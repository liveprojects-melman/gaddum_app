(function() {
  'use strict';

  angular
    .module('friends', [
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
