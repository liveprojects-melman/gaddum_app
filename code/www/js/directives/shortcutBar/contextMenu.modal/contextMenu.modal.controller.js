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
    $scope.contextMenuModal=contextMenuModal;
    function init() {
      mc.params =contextMenuModal.getParams();
      
      
    }
    init();
    function closeModal(){
      
      contextMenuModal.close();
    }
    mc.closeModal = closeModal;
  }
})();