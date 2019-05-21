(function() {
  'use strict';

  angular
    .module('groups', [
      'ui.router',
      'ngAnimate',
      'ion-slide-box-tabs'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('groupsList', {
          cache: false,
          url: '/main/groups',
          //templateUrl: '/js/modules/groups/groups.list.html',
          //controller: 'groupsListController as vm'
        });
    });
})();
