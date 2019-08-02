(function () {
  'use strict';

  angular
    .module('gaddum.searchCat')
    .controller('searchCarModalController', searchCarModalController);

    searchCarModalController.$inject = [
      'searchCatModal',
      '$scope'
      
  ];
  
  function searchCarModalController(
    searchCatModal,
    $scope

  ) {
    var mc = angular.extend(this, {
      
    });
    $scope.searchCatModal=searchCatModal;
    function init() {
      mc.params =searchCatModal.getParams();
      console.log("params",mc.params);
      
    }
    init();
    
    
    
    function change(search){
      search.value = !search.value;
      searchCatModal.chosen(mc.params);
    }
    
    mc.change =change;




  }
})();