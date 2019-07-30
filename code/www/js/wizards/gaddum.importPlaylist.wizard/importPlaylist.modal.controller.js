

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
      'gaddumMusicProviderService'

  ];
  
  function importPlaylistWizardController(
    importPlaylistWizard,
    $scope,
    $timeout,
    $q,
    gaddumMusicProviderService
  ) {
    var moodIdDict = {};
    var mc = angular.extend(this, {
      itemSelected:false,
      emotionSelected: '',
      playlistSelected:[]
    });
    $scope.importPlaylistWizard=importPlaylistWizard;
    function init() {
      
      
      mc.params =importPlaylistWizard.getParams();
      console.log(mc.params);
      mc.playlists = gaddumMusicProviderService.importAllPlaylists();
      console.log("heya",mc.playlists);
      
    }
    init();

  }
})();