(function() {
  'use strict';

  angular
    .module('playlists', [
      'ui.router',
      'ngAnimate',
      'ion-slide-box-tabs'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('playlistsList', {
          cache: false,
          url: '/main/playlists'
        });
    });
})();
