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
    '$q'
  ];
  function playlistService(
    dataApiService,
    PlaylistIdentifier,
    GenericTrack,
    $q
  ) {


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
      return dataApiService.asyncSetGenericTracksInPlaylist(playlistIdentifier, arrayGenericTracks);
    }

    function asyncGetPlaylistTracks(playlistIdentifier){
      return dataApiService.asyncGetGenericTracksInPlaylist(playlistIdentifier);
    }

    function asyncRemovePlaylist(playlistIdentifier){
      return dataApiService.asyncRemovePlaylist(playlistIdentifier);
    }



    var service = {
      asyncCreatePlaylist:asyncCreatePlaylist,
      asyncSeekPlaylists:asyncSeekPlaylists,
      asyncUpdatePlaylist: asyncUpdatePlaylist,
      asyncSetPlaylistTracks:asyncSetPlaylistTracks,
      asyncGetPlaylistTracks:asyncGetPlaylistTracks,
      asyncRemovePlaylist:asyncRemovePlaylist

    };

    return service;
  }
})();
