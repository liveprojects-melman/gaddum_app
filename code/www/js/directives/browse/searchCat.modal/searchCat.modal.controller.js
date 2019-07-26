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
      mc.list = mc.params;
    }
    init();
    
    
    
    function changeTrack(){
      mc.list.track = !mc.list.track;
      searchCatModal.chosen(mc.list);
    }
    function changeArtist(){
      mc.list.artist = !mc.list.artist;
      searchCatModal.chosen(mc.list);
    }
    function changeAlbum(){
      mc.list.album = !mc.list.album;
      searchCatModal.chosen(mc.list);
    }
    function changePlaylist(){
      mc.list.playlist = !mc.list.playlist;
      searchCatModal.chosen(mc.list);
    }
    mc.changeTrack =changeTrack;
    mc.changeArtist =changeArtist;
    mc.changeAlbum =changeAlbum;
    mc.changePlaylist =changePlaylist;



  }
})();