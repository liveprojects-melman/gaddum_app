

(function () {
  'use strict';

  angular
    .module('gaddum.playlists')
    .controller('importPlaylistWizardController', importPlaylistWizardController);

    importPlaylistWizardController.$inject = [
      'importPlaylistWizard',
      '$scope',
      '$timeout',
      '$q',
      'gaddumMusicProviderService',
      'ImportPlaylist'

  ];
  
  function importPlaylistWizardController(
    importPlaylistWizard,
    $scope,
    $timeout,
    $q,
    gaddumMusicProviderService,
    ImportPlaylist
  ) {
    var moodIdDict = {};
    var mc = angular.extend(this, {
      itemSelected:false,
      emotionSelected: '',
      playlistArray:[]
    });
    $scope.importPlaylistWizard=importPlaylistWizard;
    function init() {
      
      
      mc.params =importPlaylistWizard.getParams();
      console.log(mc.params);
      gaddumMusicProviderService.importAllPlaylists().then(function(result){
        console.log("heya",result);
        var count = 0;
        result.data.items.forEach(function(element) {
          console.log(count);
          mc.playlistArray[count] = {"name":element.name};
          mc.playlistArray[count].display_name = element.owner.display_name;
          mc.playlistArray[count].id = element.id;
          mc.playlistArray[count].artwork = element.images[0].url;
          mc.playlistArray[count].value = false;
          console.log("playlistArry",mc.playlistArray);
          count = count+1;
        });
      });
      
      
    }
    init();
    function playlistSelected(index){
      console.log("here",mc.playlistArray[index].value);
      mc.playlistArray[index].value = !mc.playlistArray[index].value;
      mc.itemSelected = true;
    }
    function importPlaylists(){
      console.log("got in here");
      var importArray = [];
      mc.playlistArray.forEach(function(element) {
        if (element.value === true) {
          importArray.push(ImportPlaylist.build(element.name,element.id,element.artwork));
        }
      });
      gaddumMusicProviderService.asyncImportPlaylists(importArray);
    }
    mc.importPlaylists = importPlaylists;
    mc.playlistSelected = playlistSelected;

  }
})();