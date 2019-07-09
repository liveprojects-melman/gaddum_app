(function(){
  'user strict';

  angular
    .module('gaddum.profile')
    .controller('profileController', profileController);

  profileController.$inject = [
    '$state',
    '$stateParams',
    'profileService'
  ];

  function profileController(
    $state,
    $stateParams,
    messagesService
  ) {
    var vm = angular.extend(this, {

    });

    vm.test=function test() {
      $state.go(getPermissionsState);
    };


  }

})();
