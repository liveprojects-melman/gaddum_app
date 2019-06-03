(function(){
  'user strict';

  angular
    .module('browse')
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

  }

})();
