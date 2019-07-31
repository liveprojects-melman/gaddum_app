(function () {
  'use strict';

  angular
    .module('gaddum.selector')
    .controller('selectorModalController', selectorModalController);

    selectorModalController.$inject = [
      'selectorModal',
      '$scope'

  ];
  
  function selectorModalController(
    selectorModal,
    $scope
  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.selectorModal=selectorModal;
    function init() {
      mc.namedIdentifiers = selectorModal.getParams();
      
    }
    init();
    function select(namedIdentifier){
      selectorModal.callback(namedIdentifier);

    }
    mc.select = select;
  }
})();