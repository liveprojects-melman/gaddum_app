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
        //bm.searchType = result;
        console.log("searchType",bm.searchType);
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
    }
    // function showList(){
    //   if (bm.searchBrowse.length >=1){
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    function searchTypeText(){
      
    }
    function play(TID){
      gaddumMusicProviderService.playTrack(TID);
      howAreYou();
    }
    function howAreYou(){
      
      howAreYouModal.open(null,fnCallbackOk,fnCallbackCancel);
    }
    function fnCallbackOk(emotion){
      onItemSelect(emotion.id);
      console.log(emotion);
    }
    function fnCallbackCancel(){
      console.log("modal canceled");
    }
    function addToPlaylist(track){
      addToPlaylistWizard.open(track,fnCallbackAddToPlaylistOk,fnCallbackAddToPlaylistCancel);
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
