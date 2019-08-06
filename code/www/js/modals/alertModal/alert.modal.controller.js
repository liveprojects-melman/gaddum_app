(function () {
  'use strict';

  angular
    .module('gaddum.alert')
    .controller('alertModalController', alertModalController);

    alertModalController.$inject = [
    'alertModal',
    '$scope'

  ];

  function alertModalController(
    alertModal,
    $scope
  ) {




    
    var ac = angular.extend(this, {
      
    });




    $scope.alertModal = alertModal;

    function init() {
      ac.params = alertModal.getParams();
    }
    init();

  }
})();