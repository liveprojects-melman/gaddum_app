(function(){
  'user strict';

  angular
    .module('gaddum.messages')
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
    
    // attaching these methods to ng-mousedown/up on ion-items
    // makes swiping the item not cause the slidebox to move
    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };

    vm.messagesList = messagesService.messagesList;
  }

})();
