(function() {
  'use strict;'

  angular
    .module('gaddum.profile')
    .factory('profileService', profileService)
  ;

  profileService.$inject = [
    '$http'
  ];
  function profileService(
    $http
  ) {
    var service={};

    service.createModalList = function createModalList(){
      var edit = "Edit Profile";
      var editFun = showEditModal;
      var contextMenu = [];
      contextMenu[0]=MenuItem.build(edit,editFun);
    }
    service.showEditModal = function showEditModal(){
      var allGenres=profileService.getAllGenres();
          var userGenres=profileService.getUserGenres();
          var modalParams=[
              {"allGenres":allGenres},
              {"userGenres":userGenres},
              {"userProfile":profileService.getUserProfile()}
          ];
          profileEditModal.open(modalParams,callback,refresh);
    }


    return service;
  }
})();
