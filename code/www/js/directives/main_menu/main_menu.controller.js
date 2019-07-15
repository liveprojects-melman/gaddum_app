(function () {
  'use strict';

  angular
    .module('gaddum.main_ui')
    .controller('mainMenuController', mainMenuController);

    mainMenuController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    '$timeout',

    
    
    '$ionicModal',
    '$scope',
    /* 'friend_connectionSrvc' */

  ];

  function mainMenuController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    $timeout,


    
   
    $ionicModal,
    

    $scope,
  ) {
    var vm = angular.extend(this, {
      
    });

    function mainMenuModal(){
      
      $ionicModal.fromTemplateUrl('js/directives/main_menu/main_menu.modal.html', {
        scope: $scope,
        animation: 'fadeIn',
        class:"mainMenuModal"
        
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }
    function goToAbout(){
      console.log("it would go to about now")
    }
    function goToSettings(){
      console.log("it would go to settings now")
    }
    vm.goToAbout = goToAbout;
    vm.goToSettings = goToSettings;
    vm.mainMenuModal = mainMenuModal;
  }
})();
