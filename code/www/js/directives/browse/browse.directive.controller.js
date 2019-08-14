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
    'Playlist',
    'userProfilerService',
    'gaddumShortcutBarService',
    
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
    Playlist,
    userProfilerService,
    gaddumShortcutBarService,
    
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
      bm.searching=false;
      bm.searchBrowse=[];
      bm.sList= false;
      bm.lastSeek = null;
      bm.lastType = null;
      bm.page = 0;
      bm.moreTrackCheck = true;
      bm.searchText =null;
      bm.searchType = [];
      bm.searchingType = [];
      gaddumMusicProviderService.asyncGetSupportedSearchModifier().then(function(result){
        result.forEach(function(element){
          bm.searchType.push({mod:element,value:false});
        });
        bm.searchType[0].value = true;
      });
    }
    init();
    function search(){
      bm.moreTrackCheck = false;
      bm.searchingType = [];
      bm.page = 0;
      bm.searching = true;
      bm.searchBrowse = [];
      bm.searchType.forEach(function(type){
        if(type.value){
          bm.searchingType.push(type.mod);
        }
        
      });
      if(bm.searchingType.length == 0){
        bm.searchType.forEach(function(type){
          if(type.mod.name == "Track"){
            bm.searchingType.push(type.mod);
            bm.typeSearch = "Track";
            bm.searchType[0].value = true;
          }
        });
      }
      console.log("searching",bm.searchingType);
      gaddumMusicProviderService.asyncSeekTracks(bm.searchText,bm.searchingType,10,bm.page).then(function(result){
        console.log(result);
        bm.lastSeek = bm.searchText;
        bm.lastType = bm.searchingType;
        bm.sList = true;
        bm.searching=false;
        result.forEach(function(element){
          bm.searchBrowse.push(element);
        });
        
        
      }).catch(function(er){
        bm.sList = false;
        bm.moreTrackCheck = true;
        bm.searching=false;
        console.log(er);
    });
    }
    function moreTracks(){
      bm.searching = true;
      bm.page = bm.page+1;
      gaddumMusicProviderService.asyncSeekTracks(bm.lastSeek,bm.lastType,10,bm.page).then(function(result){
        bm.sList = true;
        bm.searching=false;
        result.forEach(function(element){
          bm.searchBrowse.push(element);
        });
        
        
      }).catch(function(er){
        bm.sList = true;
        bm.searching=false;
        bm.moreTrackCheck = true;
        console.log(er);
    });

    }
    function openSearchModal(){
      searchCatModal.open(bm.searchType,fnCallbackSearchOk,fnCallbackSearchCancel);
    }
    function fnCallbackSearchOk(){

    }
    
    function fnCallbackSearchCancel(type){
      bm.searchType = type;
      bm.searchBrowse=[];
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
    bm.typeSearch="Track";
    function searchTypeText(){
      var result = "";
      var first = true;
      console.log(bm.searchType);
      bm.searchType.forEach(function(element) {
        if(element.value){
          if (first){
            result = element.mod.name;
            first = false;
          }
          else{
            result = result+", "+ element.mod.name;
          }
        }        
      });
      if(result === ""){
        result = "Track";
        bm.searchType[0].value = true;
      }
      bm.typeSearch = result;
    }
    function play(track){
      console.log("track",track);
      currentTrack = GenericTrack.build(track.getPlayerUri(),track.getName(),track.getAlbum(),track.getArtist(),track.getDuration_s());
      console.log("current",currentTrack);
      howAreYou();
    }
    var currentTrack = null;
    function howAreYou(){
      howAreYouModal.open(null,fnCallbackHowAreYouOk,fnCallbackHowAreYouCancel);
    }
    function fnCallbackHowAreYouOk(emotion){
      var arrayTrack = [];
      var playlist=null;
      var mooded= null;
      var moodedArray =[];
      arrayTrack.push(currentTrack);
      playlist = Playlist.build(null, null, arrayTrack);
      mooded = MoodedPlaylist.build(emotion,playlist);
      moodedArray.push(mooded);
      userProfilerService.loader.asyncLoadMoodedPlaylists(moodedArray);
      console.log(moodedArray);
    }
    function fnCallbackHowAreYouCancel(){
      console.log("modal canceled");
    }
    function addToPlaylist(track){
      var trackToAdd = GenericTrack.build(track.getPlayerUri(),track.getName(),track.getAlbum(),track.getArtist(),track.getDuration_s());
      addToPlaylistWizard.open(trackToAdd,fnCallbackAddToPlaylistOk,fnCallbackAddToPlaylistCancel);
    }
    function fnCallbackAddToPlaylistOk(){
      
    }
    function fnCallbackAddToPlaylistCancel(){
      console.log("modal canceled");
    }
    
    bm.addToPlaylist=addToPlaylist;
    bm.play=play;
    bm.searchTypeText = searchTypeText;
    bm.openSearchModal = openSearchModal;
  bm.search = search;
  bm.moreTracks = moreTracks


  }
})();
