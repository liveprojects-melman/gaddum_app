(function() {
  'use strict';

  angular
    .module('groups', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('groupslist', {
          cache: false,
          url: '/groups',
          templateUrl: '/js/modules/groups/groups.list.html',
          controller: 'groupsListCtrl as vm'
        });
    });
})();
