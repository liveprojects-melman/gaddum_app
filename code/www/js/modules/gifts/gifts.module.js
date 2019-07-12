(function() {
  'use strict';

  angular
    .module('gaddum.gifts', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider,$urlRouterProvider) {
      $stateProvider
        .state('gaddum.gifts', {
          url:"^/gifts",
          cache: true,
          redirectTo: 'gaddum.gifts.giftsList',
//          virtual: true
        })
        .state('gaddum.gifts.giftsList', {
          cache: false,
          url: '^/gifts/list',
          views: {
            'gifts@gaddum': {
              templateUrl: 'js/modules/gifts/gifts.list.html',
              controller: "giftsListController",
              controllerAs: "gilc"
            }
          }
        });
    });
})();
