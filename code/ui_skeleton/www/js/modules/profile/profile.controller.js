(function(){
  'user strict';

  angular
    .module('profile')
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

  }

})();
