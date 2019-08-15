(function () {
  'use strict;'

  angular
    .module('gaddum.playlists' )
    .factory('playlistService', playlistService)
    ;

  playlistService.$inject = [
    'dataApiService',
    'PlaylistIdentifier',
    'GenericTrack',
    '$q',
    'gaddumMusicProviderService',
    '$timeout'
  ];
  function playlistService(
    dataApiService,
    PlaylistIdentifier,
    GenericTrack,
    $q,
    gaddumMusicProviderService,
    $timeout
  ) {
    var isBusy = false;
    function getIsBusy(){
      return isBusy;
    }
    function asyncCreatePlaylist(name){
      return dataApiService.asyncCreatePlaylist(name);
    }

    function asyncSeekPlaylists(searchName){      
      return dataApiService.asyncSeekPlaylists(searchName);
    }

    function asyncUpdatePlaylist(playlistIdentifier){
      return dataApiService.asyncUpdatePlaylist(playlistIdentifier);
    }
    
    function asyncSetPlaylistTracks(playlistIdentifier, arrayGenericTracks){
      isBusy = true;
      return dataApiService.asyncSetGenericTracksInPlaylist(playlistIdentifier, arrayGenericTracks).then(function(result){
        isBusy = false;
      });
    }

    function asyncGetPlaylistTracks(playlistIdentifier){
      return dataApiService.asyncGetGenericTracksInPlaylist(playlistIdentifier);
    }

    function asyncRemovePlaylist(playlistIdentifier){
      return dataApiService.asyncRemovePlaylist(playlistIdentifier);
    }
    function asyncImportPlaylist(playlistArray){
      isBusy = true;
      return gaddumMusicProviderService.asyncImportPlaylists(playlistArray).then(function (result) {
        isBusy = false;
      });
    }

    function asyncPlay(moodedPlaylists){

      var deferred = $q.defer();

      $timeout(

        function(){

          if(moodedPlaylist){

            // TODO: Mr Cooper 
            deferred.resolve();

          }else{
            deferred.reject();
          }


        }

      );


      return deferred.promise;

    }

    function asyncMakeTrackStatement(genericTrack,MoodId){

      var deferred = $q.defer();

      $timeout(

        function(){

          if(moodedPlaylist){

            // TODO: Mr Cooper 
            deferred.resolve();

          }else{
            deferred.reject();
          }


        }

      );


      return deferred.promise;

    }


    var service = {
      asyncCreatePlaylist:asyncCreatePlaylist,
      asyncSeekPlaylists:asyncSeekPlaylists,
      asyncUpdatePlaylist: asyncUpdatePlaylist,
      asyncSetPlaylistTracks:asyncSetPlaylistTracks,
      asyncGetPlaylistTracks:asyncGetPlaylistTracks,
      asyncRemovePlaylist:asyncRemovePlaylist,
      getIsBusy:getIsBusy,
      asyncImportPlaylist:asyncImportPlaylist,
      asyncMakeTrackStatement:asyncMakeTrackStatement,
      asyncPlay: asyncPlay

    };

    return service;
  }
})();
