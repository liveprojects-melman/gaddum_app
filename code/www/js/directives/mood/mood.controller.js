

(function () {
  'use strict';

  angular
    .module('gaddum.mood')
    .controller('moodDirectiveController', moodDirectiveController);

  moodDirectiveController.$inject = [
    '$state',
    '$timeout',
    '$q',
    'emotionReaderService',
    'moodService',
    '$ionicModal',
    '$scope',
    'moodSelectModal'
  ];

  function moodDirectiveController(
    $state,
    $timeout,
    $q,
    emotionReaderService,
    moodService,
    $ionicModal,
    $scope,
    moodSelectModal
  ) {
    var vm = angular.extend(this, {
      allEmotions: null,
      selectedMoodId: null,
      cameraError: false,
      isRunning: false,
      faceDetected: false,
      moodDisplay: {},
      detecting: true,
      selectbutton: false,
      helpTips: null  //this shows/hides the speech boxes 
    });

    var _interval_ms = 100;
    var enabled = true;
    var lastMoodId = null;
    var detecting = false;
    var moodIdDict = {};

    function beginInitialiseCapture(fnCallback) {

      var elementId = "canvas";
      var canvas = document.getElementById(elementId);
      var ctx = canvas.getContext("webgl1");

      emotionReaderService.setListener(fnCallback);

      emotionReaderService.initialise(canvas.width, canvas.height,
        {
          canvasId: elementId,
          videoSettings: {
            idealWidth: 320,
            idealHeight: 250,
            minWidth: 320,
            maxWidth: 320,
            minHeight: 250,
            maxHeight: 250
          }
        });

    }


    function defaultDisplay() {
      vm.moodDisplay.name = null;
      vm.moodDisplay.id = null;
      vm.moodDisplay.emoji = '😶';
    }


    function updateDisplay(moodId) {
      if (moodId) {
        vm.moodDisplay.name = moodIdDict[moodId].name;
        vm.moodDisplay.emoji = moodIdDict[moodId].emoji;
        vm.moodDisplay.id = moodId;
      } else {
        defaultDisplay();

      }
      setSelectedItem(moodId);
    }


    function setMoodId(moodId) {

      lastMoodId = moodId;
      updateDisplay(moodId);
    }


    function updateMoodId(moodId) {
      if (moodId) {
        moodId = moodId.id;

        if (moodId == lastMoodId) {
          sleep();
          updateDisplay(moodId);
        } else {
          lastMoodId = moodId;
        }
      }

    }

    function doUpdate() {
      var deferred = $q.defer();

      $timeout(

        function () {
          if (vm.detecting) {


            vm.cameraError = emotionReaderService.cameraError;
            vm.isRunning = emotionReaderService.isRunning;
            vm.faceDetected = emotionReaderService.face.detected;
            vm.faceDictionary = emotionReaderService.face.criteria;
            if (window.device == { platform: 'Browser' }) {
              vm.isRunning = true;
            }

            var moodId = null;
            if (vm.faceDetected) {
              moodId = moodService.faceToMoodId(vm.faceDictionary);
            }

            updateMoodId(moodId);

            if (vm.isRunning == true) {
              if (vm.enable === false) {
                sleep();
                vm.enable = "";
              }
              else if (vm.enable === true) {
                wake();
                vm.enable = "";
              }
            }
          }

          deferred.resolve();
        },
        _interval_ms
      );

      return deferred.promise;
    }

    function update() {
      doUpdate().then(function () {
        if (enabled) {

          update();
        }
      });

    }

    function asyncPopulateMoodResourceDict(moodIds, candidate) {
      var deferred = $q.defer();
      var promiseArray = [];

      moodIds.forEach(

        function (item) {
          var id = item.id;

          var promise = moodService.asyncMoodIdToResources(id).then(
            function (resources) {
              //console.log("asyncPopulateMoodResourceDict:", resources);
              candidate[id] = {
                name: resources.name,
                emoji: resources.emoticon_resource
              };
            }
          );
          promiseArray.push(promise);
        }
      );
      $q.all(promiseArray).then(
        function (results) {
          deferred.resolve(candidate);
        }
      );


      return deferred.promise;
    }


    function init() {
      console.log("first: ", vm.firstTime);
      console.log("moodidDict: ", moodIdDict);
      if (vm.firstTime === true) {
        vm.helpTips = true;
      }
      else {
        vm.helpTips = false;
      }
      defaultDisplay();
      vm.allEmotions = moodService.getSupportedMoodIds();
      if (emotionReaderService.isRunning === false) {
        beginInitialiseCapture(function () {
          asyncPopulateMoodResourceDict(vm.allEmotions, moodIdDict).then(update);
        });
        vm.selectbutton = true;
      }
      else{
        
        asyncPopulateMoodResourceDict(vm.allEmotions, moodIdDict).then(update);
        vm.selectbutton = true;
      }

    }

    function removeHelpTips() {
      vm.helpTips = true;
    }


    function onItemSelected() {
      sleep();
      setMoodId(vm.selectedMoodId.id);
    }
    function onItemSelect(id) {
      sleep();
      setMoodId(id);
    }

    function setSelectedItem(moodId) {
      vm.allEmotions.forEach(
        function (item) {
          if (item.id == moodId) {
            vm.selectedMoodId = item;
          }
        }
      );
    }

    function sleep() {
      if(emotionReaderService.isRunning){
        emotionReaderService.setSleep(true);
        vm.detecting = false;
      }
      
    }
    function wake() {
      if(emotionReaderService.isRunning){
        emotionReaderService.setSleep(false);
        vm.detecting = true;
      }
      
    }
    function selectModal(){
      sleep();
      
      moodSelectModal.open(vm.allEmotions,fnCallbackOk,fnCallbackCancel);
    }
    function fnCallbackOk(emotion){
      onItemSelect(emotion);
    }
    function fnCallbackCancel(){
      console.log("modal canceled");
    }
    vm.onItemSelect = onItemSelect;
    vm.selectModal = selectModal;
    vm.wake = wake;
    vm.sleep = sleep;
    vm.onItemSelected = onItemSelected;
    vm.removeHelpTips = removeHelpTips;

    init();
    // function DialogController($scope, $mdDialog) {
    //   $scope.hide = function() {
    //     $mdDialog.hide();
    //   };
  
    //   // $scope.cancel = function() {
    //   //   $mdDialog.cancel();
    //   // };
  
    //   // $scope.answer = function(answer) {
    //   //   $mdDialog.hide(answer);
    //   // };
    // }
  }
})();
