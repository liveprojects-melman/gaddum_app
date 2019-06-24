(function() {
  'use strict';

  angular
    .module('gaddum.groups', [
      'ui.router',
      'ngAnimate',
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.groups', {
          url: '/groups',
          cache: false
          //virtual: true,
          //template:"<div>CONTROLLER TEST</div>"
        })
        .state('gaddum.groups.groupsList', {
          cache: false,
          url: '/groups/list',
          controller: "groupsListController",
          controllerAs: "glc"
        });
    });
})();
