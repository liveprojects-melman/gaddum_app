(function(){
  'user strict';

  angular
    .module('gaddum.browse')
    .controller('browseListController', browseListController);

  browseListController.$inject = [
    '$state',
    '$stateParams',
    'browseService'
  ];

  function browseListController(
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

  }

})();
