(function () {
  'use strict';

  angular
    .module('gaddum.browse')
    .controller('browseDirectiveController', browseController);

  browseController.$inject = [
    '$state',
    '$stateParams',
    '$ionicSlideBoxDelegate',
    '$timeout',
    'gaddumMusicProviderService',
    'searchCatModal',
    'howAreYouModal',
    'GenericTrack',
    'MoodedPlaylist',
    'MoodIdentifier',
    'userProfilerService',
    'gaddumShortcutBarService',
    'gaddumContextMenuItem',
    'playlistService',
    'spinnerService',

    'friendsService',
    '$ionicModal',
    '$scope',
    'addToPlaylistWizard'

  ];

  function browseController(
    $state,
    $stateParams,
    $ionicSlideBoxDelegate,
    $timeout,
    gaddumMusicProviderService,
    searchCatModal,
    howAreYouModal,
    GenericTrack,
    MoodedPlaylist,
    MoodIdentifier,
    userProfilerService,
    gaddumShortcutBarService,
    gaddumContextMenuItem,
    playlistService,
    spinnerService,

    browseService,
    $ionicModal,

    $scope,
    addToPlaylistWizard
  ) {
    var bm = angular.extend(this, {

    });

    bm.preventSlideBox = function preventSlideBox() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };
    bm.allowSlideBox = function allowSlideBox(e) {
      $ionicSlideBoxDelegate.enableSlide(true);
    };


    function init() {
      createModalList();
      gaddumShortcutBarService.disableContext();
      bm.searching = false;
      bm.searchBrowse = [];
      bm.sList = false;
      bm.lastSeek = null;
      bm.lastType = null;
      bm.page = 0;
      bm.moreTrackCheck = true;
      bm.searchText = null;
      bm.searchType = [];
      bm.searchingType = [];
      gaddumMusicProviderService.asyncGetSupportedSearchModifier().then(function (result) {
        result.forEach(function (element) {
          bm.searchType.push({ mod: element, value: false });
        });
        bm.searchType[0].value = true;
      });

    }
    init();
    function search() {
      if (bm.searchText.length != 0) {
        gaddumShortcutBarService.disableContext();
        bm.moreTrackCheck = false;
        $('#searchBox').blur();
        bm.searchingType = [];
        bm.page = 0;
        bm.searching = true;
        spinnerService.spinnerOn();
        bm.searchBrowse = [];
        bm.searchType.forEach(function (type) {
          if (type.value) {
            bm.searchingType.push(type.mod);
          }

        });
        if (bm.searchingType.length == 0) {
          bm.searchType.forEach(function (type) {
            if (type.mod.name == "Track") {
              bm.searchingType.push(type.mod);
              bm.typeSearch = "Track";
              bm.searchType[0].value = true;
            }
          });
        }
        console.log("searching", bm.searchingType);
        gaddumMusicProviderService.asyncSeekTracks(bm.searchText, bm.searchingType, 10, bm.page).then(function (result) {
          console.log(result);
          bm.lastSeek = bm.searchText;
          bm.lastType = bm.searchingType;
          bm.sList = true;
          bm.searching = false;
          spinnerService.spinnerOff();
          result.forEach(function (element) {
            bm.searchBrowse.push(element);
          });
          gaddumShortcutBarService.enableContext();


        }).catch(function (er) {
          bm.sList = false;
          bm.moreTrackCheck = true;
          bm.searching = false;
          spinnerService.spinnerOff();
          console.log(er);
        });
      }
    }
    function createModalList() {
      var firstVariable = "Play All Tracks";
      var firstFunc = howAreYouPlayAllTracks;
      var contextMenu = [];
      contextMenu[0] = gaddumContextMenuItem.build(firstVariable, firstFunc);
      var conMenu = contextMenu;
      gaddumShortcutBarService.setContextMenu(conMenu);
    }
    function howAreYouPlayAllTracks() {
      howAreYouModal.open(null, fnCallbackHowAreYouOkPlay, fnCallbackHowAreYouCancel);
    }
    function fnCallbackHowAreYouOkPlay(emotion) {
      var arrayTrack = [];
      var currentTrack = null;
      var mooded = null;
      var moodedArray = [];
      bm.searchBrowse.forEach(function (track) {
        currentTrack = GenericTrack.build(track.getPlayerUri(), track.getName(), track.getAlbum(), track.getArtist(), track.getDuration_s());
        arrayTrack.push(currentTrack);
      });
      mooded = MoodedPlaylist.build(emotion, arrayTrack);
      moodedArray.push(mooded);
      playlistService.asyncPlay(moodedArray);
      console.log(moodedArray);
    }
    function fnCallbackHowAreYouCancel() {
      console.log("modal canceled");
    }

    function moreTracks() {
      bm.searching = true;
      spinnerService.spinnerOn();
      bm.page = bm.page + 1;
      gaddumMusicProviderService.asyncSeekTracks(bm.lastSeek, bm.lastType, 10, bm.page).then(function (result) {
        bm.sList = true;
        bm.searching = false;
        spinnerService.spinnerOff();
        result.forEach(function (element) {
          bm.searchBrowse.push(element);
        });


      }).catch(function (er) {
        bm.sList = true;
        bm.searching = false;
        spinnerService.spinnerOff();
        bm.moreTrackCheck = true;
        console.log(er);
      });

    }
    function openSearchModal() {
      searchCatModal.open(bm.searchType, fnCallbackSearchOk, fnCallbackSearchCancel);
    }
    function fnCallbackSearchOk() {

    }

    function fnCallbackSearchCancel(type) {
      bm.searchType = type;
      bm.searchBrowse = [];
      gaddumShortcutBarService.disableContext();
      bm.moreTrackCheck = true;
      searchTypeText();
    }
    // function showList(){
    //   if (bm.searchBrowse.length >=1){
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    bm.typeSearch = "Track";
    function searchTypeText() {
      var result = "";
      var first = true;
      console.log(bm.searchType);
      bm.searchType.forEach(function (element) {
        if (element.value) {
          if (first) {
            result = element.mod.name;
            first = false;
          }
          else {
            result = result + ", " + element.mod.name;
          }
        }
      });
      if (result === "") {
        result = "Track";
        bm.searchType[0].value = true;
      }
      bm.typeSearch = result;
    }
    function play(track) {
      console.log("track", track);
      currentTrack = GenericTrack.build(track.getPlayerUri(), track.getName(), track.getAlbum(), track.getArtist(), track.getDuration_s());
      console.log("current", currentTrack);
      howAreYou();
    }
    var currentTrack = null;
    function howAreYou() {
      howAreYouModal.open(null, fnCallbackHowAreYouOk, fnCallbackHowAreYouCancel);
    }
    function fnCallbackHowAreYouOk(emotion) {
      var arrayTrack = [];
      var mooded = null;
      var moodedArray = [];
      arrayTrack.push(currentTrack);
      mooded = MoodedPlaylist.build(emotion, arrayTrack);
      moodedArray.push(mooded);
      playlistService.asyncPlay(moodedArray);
      console.log(moodedArray);
    }
    function fnCallbackHowAreYouCancel() {
      console.log("modal canceled");
    }
    function addToPlaylist(track) {
      var trackToAdd = [];
      playlistService.asyncImportTrack(track).then(function (genTrack) {
        trackToAdd.push(genTrack);
        addToPlaylistWizard.open(trackToAdd, fnCallbackAddToPlaylistOk, fnCallbackAddToPlaylistCancel);
      });
    }
    function fnCallbackAddToPlaylistOk() {

    }
    function fnCallbackAddToPlaylistCancel() {
      console.log("modal canceled");
    }

    bm.addToPlaylist = addToPlaylist;
    bm.play = play;
    bm.searchTypeText = searchTypeText;
    bm.openSearchModal = openSearchModal;
    bm.search = search;
    bm.moreTracks = moreTracks


  }
})();
