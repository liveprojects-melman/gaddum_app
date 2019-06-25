(function() {
  'use strict';

  angular
    .module('gaddum.messages', [
      'ui.router',
      'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('gaddum.messages', {
          url: '/messages',
          cache: false,
          redirectTo: 'gaddum.messages.messagesList',
          virtual: true
        })
        .state('gaddum.messages.messagesList', {
          cache: false,
          url: '/messages/list',
          views: {
            'messages@gaddum': {
              tetmplateUrl: 'js/modules/messages/messages.list.html',
              controller: "messagesListController",
              controllerAs: "mlc"
            }
          }
        });
    });
})();
