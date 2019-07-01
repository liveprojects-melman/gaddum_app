(function() {
  'use strict';

  angular
    .module('gaddum.browse', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.browse', {
          url: '^/browse',
          redirectTo: 'gaddum.browse.list',
          cache: false,
          virtual: true
        })
        .state('gaddum.browse.list', {
          cache: false,
          url: '^/browse/list',
          views: {
            'browse': {
              templateUrl:'js/modules/browse/browse.list.html',
              controller:'browseListController',
              controllerAs: 'blc'
            }
          }
        });
    });
})();
