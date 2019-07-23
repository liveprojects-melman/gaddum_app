(function () {
  'use strict';

  angular
    .module('gaddum.shortcutBar')
    .controller('gaddumContextMenuModalController', gaddumContextMenuModalController);

    gaddumContextMenuModalController.$inject = [
      'gaddumContextMenuModal',
      '$scope'

  ];
  
  function gaddumContextMenuModalController(
    gaddumContextMenuModal,
    $scope
  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.gaddumContextMenuModal=gaddumContextMenuModal;
    function init() {
      mc.params =gaddumContextMenuModal.getParams();
      
      
    }
    init();
    function closeModal(){
      
      gaddumContextMenuModal.close();
    }
    mc.closeModal = closeModal;
  }
})();