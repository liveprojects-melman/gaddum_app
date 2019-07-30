

(function () {
  'use strict';

  angular
    .module('gaddum.playlists')
    .controller('addToPlaylistModalController', addToPlaylistModalController);

    addToPlaylistModalController.$inject = [
      'addToPlaylistWizard',
      '$scope',
      '$timeout',
      '$q'

  ];
  
  function addToPlaylistModalController(
    addToPlaylistWizard,
    $scope,
    $timeout,
    $q
  ) {
    var moodIdDict = {};
    var mc = angular.extend(this, {
      itemSelected:false,
      emotionSelected: ''
    });
    $scope.addToPlaylistWizard=addToPlaylistWizard;
    function init() {
      
      
      mc.params =addToPlaylistWizard.getParams();
      console.log(mc.params);
      
    }
    init();

  }
})();