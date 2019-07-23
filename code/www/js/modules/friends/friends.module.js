(function() {
  'use strict';

  angular
    .module('gaddum.friends', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.friends', {
//          cache: false,
          url: '^/friends',
          redirectTo: 'friendsList',
//          virtual: false
        })
        .state('gaddum.friends.friendsList', {
          cache: false,
          url: '^/friends/list',
          resolve: (['gaddumShortcutBarService',function(gaddumShortcutBarService){
            gaddumShortcutBarService.setContextMenu({});
          }]),
          views: {
            'friends@gaddum': {
              templateUrl: 'js/modules/friends/friends.list.html',
              controller: "friendsListController",
              controllerAs: "flc"
            }
          }
        });
    });


})();
