(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('AboutModalController', AboutModalController);

    AboutModalController.$inject = [
      'AboutModal',
      '$scope',
      'aboutService'

  ];
  
  function AboutModalController(
    AboutModal,
    $scope,
    aboutService
  ) {
    var ac = angular.extend(this, {
      
    });

    ac.appVersion = aboutService.appVersion();
    ac.componentsLicenses = (aboutService.componentsLicenses()).licenses;
    ac.projectPersonnel = aboutService.projectPersonnel();
    ac.gaddumLink = aboutService.gaddumLink();
    

    $scope.AboutModal=AboutModal;
    function init() {
      ac.params =AboutModal.getParams();
      
    }
    init();
    
  }
})();