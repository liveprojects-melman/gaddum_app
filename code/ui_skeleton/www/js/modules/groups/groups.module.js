(function() {
  'use strict';

  angular
    .module('gaddum.groups', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.groups', {
          url: '^/groups',
          redirectTo: 'gaddum.groups.groupsList',
          virtual: true
        })
        .state('gaddum.groups.groupsList', {
          cache: true,
          url: '^/groups/list',
          views: {
            'groups@': {
              templateUrl:'js/modules/groups/groups.list.html',
              controller: "groupsListController",
              controllerAs: "glc"
            }
          }
        });
    });
})();
