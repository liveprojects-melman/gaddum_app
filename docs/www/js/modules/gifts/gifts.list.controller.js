(function(){
  'user strict';

  angular
    .module('gaddum.gifts')
    .controller('giftsListController', giftsListController);

  giftsListController.$inject = [
    '$state',
    '$stateParams',
    'giftsService'
  ];

  function giftsListController(
    $state,
    $stateParams,
    giftsService
  ) {
    var vm = angular.extend(this, {

    });

    vm.giftsList = giftsService.giftsList;
  }

})();
