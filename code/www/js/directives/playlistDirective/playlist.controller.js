(function () {
  'use strict';

  angular
    .module('gaddum.playlistDirective')
    .controller('playlistController', control);

  control.$inject = [
    '$state',
    'profileService',
    'profileEditModal',
    'gaddumContextMenuItem',
    'gaddumShortcutBarService',
    'gaddumMusicProviderService',
    'playlistService',
    '$ionicSlideBoxDelegate',
    'playlistViewModal'
  ];

  function control(
    $state,
    profileService,
    profileEditModal,
    gaddumContextMenuItem,
    gaddumShortcutBarService,
    gaddumMusicProviderService,
    playlistService,
    $ionicSlideBoxDelegate,
    playlistViewModal

  ) {
    var vm = angular.extend(this, {
      scrollGenre: true,
      genresFontStyle: false,
      firstSearch: true,
      playlistsToShow: {},
      searching:false,
      searchTerm:""

    });
    var scale = 8;
    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };


    function init() {
      onNewSearch("");
    };

    vm.removePlaylist = function(index) {
      var playlist = vm.playlistsToShow[index];
      console.log("removing: " + playlist.getName());
      playlistService.asyncRemovePlaylist(playlist).then(
        function(){
          onNewSearch(vm.searchTerm);
        },
        onError
      );

      
    }

  

    vm.viewPlaylist = function (index) {
      var playlist = vm.playlistsToShow[index];

      //modal
      //var viewedPlaylist=playlistService.getPlaylist(PlaylistToGet);
      console.log("Veiwing: ", playlist);
      playlistService.asyncGetPlaylistTracks(playlist).then(function (tracks) {
        console.log("tracks", tracks);
        var modalParams =
          { "playlist": playlist, "name": playlist.getName(), "tracks": tracks }
          /*  {"userGenres":userGenres},
           {"userProfile":profileService.getUserProfile()} */
          ;
        playlistViewModal.open(modalParams, vm.removePlaylist, refresh);
      });
      //var,ok,c
    };


    vm.playPlaylist = function (index) {
      var playlist = vm.playlistsToShow[index];
      console.log("Playing: " + playlist.getName());
      console.log("playPlaylist: Not yet implemented...");
    }

    function refresh() {
      onNewSearch("");
      
    };





    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };




    function getPlaylist() {

      gaddumMusicProviderService.importAllPlaylists().then(function (result) {
        var id = result.data.items[0].id

        gaddumMusicProviderService.getplaylistTracks(id).then(function (result2) {

          console.log("track", result2);
        }).catch(function (er) {

          console.log(er);
        });
      }).catch(function (er) {

        console.log(er);
      });


    };

    vm.searchColour = function () {
      document.getElementById('searchPlaylistsBox').style.color = "grey";
    };

    vm.searchClick = function () {
      if (vm.firstSearch) {
        document.getElementById('searchPlaylistsBox').value = "";
        document.getElementById('searchPlaylistsBox').style.color = "black";
        console.log("clicked");
        vm.firstSearch = false;
      };

      vm.searchDeselect = function () {
        if (document.getElementById('searchPlaylistsBox').value == "") {
          document.getElementById('searchPlaylistsBox').value = "search";
          document.getElementById('searchPlaylistsBox').style.color = "grey";
          vm.firstSearch = true;
          console.log("reactivated");
        }

      };
    };


    function onNewPlaylists(playlists){
      vm.searching = false;
      console.log("playlist",playlists);
      vm.playlistsToShow = playlists;
    }


    function onError(error){
      vm.searching = false;
      console.log("playlistController: " + error.message);
    }

    function onNewSearch(searchTerm){
      vm.searching = true;
      vm.searchTerm = searchTerm;
      playlistService.asyncSeekPlaylists(searchTerm).then(
        onNewPlaylists,
        onError
      );
    }


    vm.searchPlaylists = function () {
      var searchTerm = document.getElementById("searchPlaylistsBox").value;
      
      onNewSearch(searchTerm);

    };

    init();

  }
})();