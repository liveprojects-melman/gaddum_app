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
    '$scope'

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

    $scope
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
      bm.searchText =null;
      bm.searchType = {
        "track": true,
        "artist": false,
        "album": false,
        "playlist": false
      
      }
    }
    init();
    function search(){
      bm.searching = true;
      gaddumMusicProviderService.searchSpotify(bm.searchText,bm.searchType).then(function(result){
        console.log(result);
        bm.sList = true;
        bm.searching=false;
        bm.searchBrowse = result.data.tracks.items;
        
        
      }).catch(function(er){

        console.log(er);
    });
    }
    function openSearchModal(){
      searchCatModal.open(bm.searchType,fnCallbackOk,fnCallbackCancel);
    }
    function fnCallbackOk(){

    }
    
    function fnCallbackCancel(type){
      bm.searchType = type;
      bm.searchBrowse=[];
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
      var text="";
      bm.sList = false;
      if(bm.searchType.track){
        text = text +" Track";
      }
      if(bm.searchType.artist){
        text = text +" Artist";
      }
      if(bm.searchType.album){
        text = text +" Album";
      }
      if(bm.searchType.playlist){
        text = text +" Playlist";
      }
      return text;
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
    
    bm.play=play;
    bm.searchTypeText = searchTypeText;
    bm.openSearchModal = openSearchModal;
  bm.search = search;


  }
})();
