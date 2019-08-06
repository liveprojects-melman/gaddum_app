

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
      'ImportPlaylist',
      'alertModal'

  ];
  
  function importPlaylistWizardController(
    importPlaylistWizard,
    $scope,
    $timeout,
    $q,
    gaddumMusicProviderService,
    ImportPlaylist,
    alertModal
  ) {
    var moodIdDict = {};
    var count = 0;
    var offset = 0;
    var limit = 10;
    var mc = angular.extend(this, {
      itemSelected:false,
      emotionSelected: '',
      playlistArray:[],
      hideMore: false,
      hideSpinner:true,
      importButtonText:"Press To ",
      importButtonHide:false
    });
    $scope.importPlaylistWizard=importPlaylistWizard;
    function init() {
      mc.hideSpinner = false;
      mc.params =importPlaylistWizard.getParams();
      console.log(mc.params);
      gaddumMusicProviderService.asyncGetProfilePlaylist(offset,limit).then(function(result){
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
        offset = offset+10;
        mc.hideSpinner = true;
      });
      
      
    }
    init();
    function playlistSelected(index){
      console.log("here",mc.playlistArray[index].value);
      mc.playlistArray[index].value = !mc.playlistArray[index].value;
      mc.itemSelected = true;
    }
    function more(){
      console.log("more");
      mc.hideSpinner = false;
      gaddumMusicProviderService.asyncGetProfilePlaylist(offset,limit).then(function(result){
        if(result.data.items.length === 0){
          mc.hideMore = true;
        }
        var count = offset;
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
        offset = offset+10;
        mc.hideSpinner = true;
      });
    }
    function importPlaylists(){
      mc.importButtonText = "Importing";
      mc.importButtonHide = true;
      var importArray = [];
      mc.playlistArray.forEach(function(element) {
        if (element.value === true) {
          importArray.push(ImportPlaylist.build(element.name,element.id,element.artwork));
        }
      });
      gaddumMusicProviderService.asyncImportPlaylists(importArray)
      .then(function(result){
        importPlaylistWizard.close();
        
      },function(error){
        importPlaylistWizard.close();
        alertModal.open("failed to Import",null,null);
      });
      
      
    }
    mc.more = more;
    mc.importPlaylists = importPlaylists;
    mc.playlistSelected = playlistSelected;

  }
})();