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
      searching:false

    });
    var scale = 8;
    vm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    vm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };


    function init() {
      vm.searching = true;
      playlistService.asyncSeekPlaylists("").then(function (results) {
        vm.searching = false;
        vm.playlistsToShow = results;
      });
      //save();

    };
    init();
    function save() {
      playlists.playlists.items.forEach(function (element) {
        vm.playlistsToShow.push(element);
      });
    }





    vm.viewPlaylist = function (playlist) {
      //modal
      //var viewedPlaylist=playlistService.getPlaylist(PlaylistToGet);
      console.log("p2g", playlist);
      playlistService.asyncGetPlaylistTracks(playlist.id).then(function (tracks) {
        var modalParams =
          { "playlist": playlist.getProviderPlaylistRef(), "name": playlists.getName(), "tracks": tracks }
          /*  {"userGenres":userGenres},
           {"userProfile":profileService.getUserProfile()} */
          ;
        playlistViewModal.open(modalParams, deletePlaylist, refresh);
      });
      //var,ok,c
    };

    function deletePlaylist() {
      //playlistService.deletePlaylist(playlistToDelete)
      console.log("delete");
    };

    function refresh() {
      vm.searching = true;
      playlistService.asyncSeekPlaylists("").then(function (results) {
        vm.searching = false;
        vm.playlistsToShow = results;
      });
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

    vm.searchPlaylists = function () {
      console.log("true Origional", playlists);
      console.log("origional", vm.savep);
      console.log("copy", vm.playlistsToShow.playlists);
      var searchTerm = document.getElementById("searchPlaylistsBox").value;
      var tempArray = [];
      //vm.playlistsToShow=playlists;
      playlists.playlists.items.forEach(function (playlist) {
        //console.log(playlist.name,searchTerm);
        if (playlist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          console.log("pushing" + playlist.name);
          tempArray.push(playlist);
        }
      });
      vm.playlistsToShow = tempArray;
      //console.log(vm.playlistsToShow.playlists.items);
    };

  }
})();