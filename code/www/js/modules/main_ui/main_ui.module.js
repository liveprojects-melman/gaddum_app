(function(){
  'use strict';

  angular.module('gaddum.main_ui', [
    'ui.router',
    'ngAnimate',
    'ionic'//,
//    'ion-slide-box-tabs'
  ])
    .config(function( $stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum', {
          url: '/',
          virtual: true,
          cache:true,
//          abstract: true,
          views: {
            'gaddum': {
              templateUrl: 'js/modules/main_ui/main_ui.html',
              controller: 'main_uiController',
              controllerAs: 'mlc'
            },
            'playlists@gaddum': {
              templateUrl: 'js/modules/playlists/playlists.list.html',
              controller: "playlistsListController",
              controllerAs: "pllc"
            }
          }
        });
//        .state('home', {
//          cache:true,
//          url: '/'
//        });
/*        .state('groupsList', {
          cache:true,
          url: '/main/groups'
        });*/
    })
})();
