(function(){
  'user strict';

  angular
    .module('messages')
    .controller('messagesListController', messagesListController);

  messagesListController.$inject = [
    '$state',
    '$stateParams',
    'messagesService'
  ];

  function messagesListController(
    $state,
    $stateParams,
    messagesService
  ) {
    var vm = angular.extend(this, {

    });

    vm.messagesList = messagesService.messagesList;
  }

})();
