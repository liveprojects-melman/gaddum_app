(function () {
  'use strict';

  angular
    .module('gaddum.searchCat')
    .controller('searchCatModalController', searchCatModalController);

    searchCatModalController.$inject = [
      'searchCatModal',
      '$scope'
  ];

  function searchCatModalController(
    searchCatModal,
    $scope
  ) {
    var mc = angular.extend(this, {
      //
    });

    $scope.searchCatModal=searchCatModal;

    function init() {
      mc.params =searchCatModal.getParams();
    }

    function change(search){
      search.value = !search.value;
      searchCatModal.chosen(mc.params);
    }

    mc.change = change;

    init();
  }
})();
