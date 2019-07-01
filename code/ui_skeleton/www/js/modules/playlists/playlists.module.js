(function() {
  'use strict';

  angular
    .module('gaddum.playlists', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.playlists', {
          url: '/playlists',
          cache: false,
          redirectTo: 'gaddum.playlists.playlistsList',
          virtual: true
        })
        .state('gaddum.playlists.playlistsList', {
          cache: false,
          url: '/list',
          views: {
            'playlists@gaddum': {
              templateUrl: 'js/modules/playlists/playlists.list.html',
              controller: "playlistsListController",
              controllerAs: "pllc"
            }
          }
        });
    });
})();
