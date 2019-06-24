(function() {
  'use strict';

  angular
    .module('gaddum.messages', [
      'ui.router'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('messagesList', {
          cache: false,
          url: '/main/messages'
        });
    });
})();
