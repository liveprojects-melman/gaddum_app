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
          url: '^/playlists',
          cache: true,
          redirectTo: 'gaddum.playlists.playlistsList',
//          virtual: true
        })
        .state('gaddum.playlists.playlistsList', {
          cache: false,
          url: '^/playlists/playlistsList',
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
