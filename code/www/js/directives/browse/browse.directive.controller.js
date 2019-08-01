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
      bm.searchText =null;
      bm.searchType = null;
      gaddumMusicProviderService.asyncGetSupportedSearchModifier().then(function(result){
        bm.searchType = result;
        console.log("searchType",bm.searchType);
      });
    }
    init();
    function search(){
      bm.searching = true;
      bm.searchTemp = [bm.searchType[3]];
      gaddumMusicProviderService.asyncSeekTracks(bm.searchText,bm.searchTemp).then(function(result){
        console.log(result);
        bm.sList = true;
        bm.searching=false;
        bm.searchBrowse = result.data.tracks.items;
        
        
      }).catch(function(er){

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


  }
})();
