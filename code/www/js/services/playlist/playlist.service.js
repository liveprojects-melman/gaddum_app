(function () {
  'use strict;'

  angular
    .module('gaddum.playlists' )
    .factory('playlistService', playlistService)
    ;

  playlistService.$inject = [
    'dataApiService',
    'PlaylistIdentifier',
    'GenericTrack'
  ];
  function playlistService(
    dataApiService,
    PlaylistIdentifier,
    GenericTrack

  ) {


    function asyncSeekPlaylists(searchName){
      return dataApiService.asyncSeekPlaylists(searchName);
    }

    function asyncSetPlayList(playlistIdentifier){
      return dataApiService.asyncSetPlayList(playlistIdentifier);
    }
    

    function asyncSetPlaylistTracks(playlistIdentifier, arrayGenericTracks){
      return dataApiService.asyncSetPlaylistTracks(playlistIdentifier, arrayGenericTracks);
    }

    function asyncGetPlaylistTracks(playlistIdentifier, arrayGenericTracks){
      return dataApiService.asyncGetPlaylistTracks(playlistIdentifier, arrayGenericTracks);
    }

    function asyncRemovePlaylist(playlistIdentifier){
      return dataApiService.asyncRemovePlaylist(playlistIdentifier);
    }



    var service = {
      asyncSeekPlaylists:asyncSeekPlaylists,
      asyncSetPlayList: asyncSetPlayList,
      asyncSetPlaylistTracks:asyncSetPlaylistTracks,
      asyncGetPlaylistTracks:asyncGetPlaylistTracks,
      asyncRemovePlaylist:asyncRemovePlaylist

    };

    return service;
  }
})();
