(function() {
  'use strict';

  angular
    .module('groups', [
      'ui.router',
      'ngAnimate',
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
/*        .state('groups', {
          url: '/main/groups',
          virtual: true,
        })*/
        .state(/*'groupsList'*/ 'groups', {
          template:" ",
          cache: false,
          url: '/main/groups/list',
          controller:""
        });
    });
})();