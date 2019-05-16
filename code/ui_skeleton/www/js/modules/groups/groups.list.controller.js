(function(){
  'use strict';

  angular
    .module('groups')
    .controller('groupsListCtrl', groupsListCtrl);

  groupsListCtrl.inject = [
    '$state',
    '$stateParams'
  ];

  function groupsListCtrl(
    $state,
    $stateParams
  ) {
    var vm = angular.extend(this, {

    });
  }
})();
