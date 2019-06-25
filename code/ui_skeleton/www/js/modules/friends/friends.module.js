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
          cache: false,
          url: '/friends',
          redirectTo: 'gaddum.friends.friendsList',
          virtual: true
        })
        .state('gaddum.friends.friendsList', {
          cache: false,
          url: '/friends/list',
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
