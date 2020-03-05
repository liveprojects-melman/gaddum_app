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
    'moodSelectModal',
    'gaddumShortcutBarService',
    'spinnerService'
  ];

  function moodDirectiveController(
    $state,
    $timeout,
    $q,
    emotionReaderService,
    moodService,
    $ionicModal,
    $scope,
    moodSelectModal,
    gaddumShortcutBarService,
    spinnerService
  ) {


    var vm = angular.extend(this, {
      debugging: false,
      allEmotions: null,
      selectedMoodId: null,
      cameraError: false,
      isRunning: false,
      faceDetected: false,
      moodDisplay: {},
      detecting: true,
      helpTips: null,  //this shows/hides the speech boxes 
      disableButton: false,
      emotionSelected: false,
      lookAtTheCameraText: false,
      bang: false,
      throbbing: false,
      cameraErrorString: 'Whoops! No Camera!',
      isFirstTime: true
    });

    var _interval_ms = 100;
    var enabled = true;
    var lastMoodId = null;
    var detecting = false;
    var moodIdDict = {};

    var STABILITY_LIMIT = 30;
    //modes for face detection 
    var modes = {
      searching: 0,
      detecting: 1,
      recognising: 2,
      stable: 3
    }

    /*    try{
          if(window.device.platform==="iOS"){
            vm.cameraErrorString="We can't use the iPhone Camera (yet)";
          }
        } catch(e){
          //
        }*/

    function beginInitialiseCapture(fnCallback) {

      var elementId = "canvas";
      var canvas = document.getElementById(elementId);
      var ctx = canvas.getContext("webgl1");

      CanvasCamera.initialize(canvas);
      var options = {
        cameraFacing: 'front',
        fps: 30,
        width: 288,//288,
        height: 288,//352,
        canvas: {
          width: 288,
          height: 288
        },
        capture: {
          width: 288,
          height: 288
        },
        onAfterDraw: function (frame) {
          if (vm.isFirstTime) {
            vm.isFirstTime = false;
            // We init Weboji here otherwise the size of the video canvas is wrong.
            vm.initWeboji();
          }
        }
      };
      //console.log("££ Starting CanvasCamera with ",options);
      CanvasCamera.start(options);

      emotionReaderService.setListener(fnCallback);

    }

    vm.initWeboji = function initWeboji() {
      //console.log("!! initWeboji called");
      emotionReaderService.initialise(
        canvas.width, canvas.height, {
        canvasId: "jeefacetransferCanvas",
        videoSettings: {
          idealWidth: 320,
          idealHeight: 250,
          minWidth: 320,
          maxWidth: 320,
          minHeight: 250,
          maxHeight: 250,
          videoElement: canvas
        }
      }
      );
    };

    function defaultDisplay() {
      vm.moodDisplay.name = 'No Mood!';
      vm.moodDisplay.id = 'No Mood!';
      vm.moodDisplay.emoji = '😶';
    }


    function updateDisplay(moodId) {
      if (moodId) {
        //console.log("mood", moodId, "moodDict", moodIdDict, "mooddis", vm.moodDisplay);
        vm.moodDisplay.name = moodIdDict[moodId].name;
        vm.moodDisplay.emoji = moodIdDict[moodId].emoji;
        vm.moodDisplay.id = moodId;
        vm.emotionSelected = true;
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


    //////////////////////////////////
    //////////STATE HANDLERS//////////
    //////////////////////////////////
    function handleSearch() {
      //if a face is detected then change the mode to 'detected'
      if (vm.faceDetected) {
        vm.mode = modes.detecting;
      }
    }

    function handleDetected() {
      //do face SVG stuff
      setHighlighting(false);
      updateStickFace(vm.faceDictionary);

      //if a face is no longer detected go back to searching
      if (vm.cameraError || !vm.IsRunning || !vm.faceDetected) {
        vm.mode = modes.searching;
      }

      //if moodID is not null change state to recognising
      moodId = moodService.faceToMoodId(vm.faceDictionary);
      if (!!moodId) {
        vm.mode = modes.recognising;
      }
      counter = 0;
      vm.faceDictionary;
    }

    function handleRecognising() {
      //go back to searching if no face is detected
      if (vm.cameraError || !vm.IsRunning || !vm.faceDetected) {
        vm.mode = modes.searching;
      } else {
        //otherwise highlight the face and do SVG stuff
        setHighlighting(true);
        updateStickFace(vm.faceDictionary);

        //if the latest mood is not null and is the same as the last one increase the stability counter
        //when the stability counter reaches the limit set the mood to stable.
        //if the latest mood is null go back to detecting
        newMoodId = moodService.faceToMoodId(vm.faceDictionary);
        if (!!newMoodId) {
          vm.mode = modes.recognising;
          if (newMoodId.id === moodId.id) {
            counter++;
            if (counter > STABILITY_LIMIT) {
              vm.mode = modes.stable;
            }
          }
        } else {
          vm.mode = modes.detecting;
        }
      }
    }

    function handleStable() {
      //when it reaches stable and there's still a face then update display.
      if (vm.cameraError || !vm.IsRunning || !vm.faceDetected) {
        vm.mode = modes.searching;
      } else {
        updateDisplay(moodId);
      }
    }

    //////////////////////////////////////////
    ////////// END OF STATE HANDLERS//////////
    //////////////////////////////////////////



    var svg = document.getElementById('highlight');
    var count = 0;
    function doUpdate() {
      var deferred = $q.defer();
      vm.cameraError = emotionReaderService.cameraError;
      //timeout takes a function and then runs it evey x number of milliseconds
      $timeout(
        function () {
          if (vm.detecting) {
            //console.log("*** doUpdate, emotionReaderService:", emotionReaderService);

            vm.cameraError = emotionReaderService.cameraError;
            vm.isRunning = emotionReaderService.isRunning;
            vm.faceDetected = emotionReaderService.face.detected;
            vm.faceDictionary = emotionReaderService.face.criteria;
            if (window.device == { platform: 'Browser' }) {
              vm.isRunning = true;
            }

            var moodId = null;
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

          //go to various handlers depending on the current state
          //(this runs every 100ms at the time of writing so 10fps for the animated face - bit shit (maybe decrease the number of ms for $timeout??))
          switch (vm.mode) {
            case modes.searching:
              handleSearch();
              break;
            case modes.detected:
              handleDetected();
              break;
            case modes.recognising:
              handleRecognising();
              break;
            case modes.stable:
              handleStable();
              break;
          }

          deferred.resolve();
        },
        _interval_ms
      );

      return deferred.promise;
    } //end of do update

    function update() {
      doUpdate().then(function () {
        if (moodService.onOrOff()) {

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
      vm.mode = modes.searching;
      vm.emotionSelected = false;
      //console.log("first: ", vm.firstTime);
      //console.log("moodidDict: ", moodIdDict);
      vm.detecting = false;
      spinnerService.spinnerOn();
      vm.disableButton = true;
      if (vm.firstTime === true) {
        vm.helpTips = true;
      }
      else {
        vm.helpTips = false;
      }
      defaultDisplay();
      moodService.asyncGetSupportedMoodIds().then(function (result) {
        vm.allEmotions = result;
        if (emotionReaderService.isReady === false) {
          beginInitialiseCapture(function () {
            asyncPopulateMoodResourceDict(vm.allEmotions, moodIdDict).then(function () {
              spinnerService.spinnerOff();
              sleep();
              vm.disableButton = false;
              update();
            });
          });
        }
        else {

          asyncPopulateMoodResourceDict(vm.allEmotions, moodIdDict).then(function () {
            spinnerService.spinnerOff();
            vm.disableButton = false;
            sleep();
            update();
          });
        }
      });


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
    var isSleeping = true;
    function sleep() {
      $timeout(function () {
        if (emotionReaderService.isRunning) {
          emotionReaderService.setSleep(true);
          vm.detecting = false;
          spinnerService.spinnerOff();
          isSleeping = true;
        }
        else {
          if (!isSleeping) {
            sleep();
          }
          else {
            vm.detecting = false;
            spinnerService.spinnerOff();
          }

        }
      }, 100);
    }
    function wakeUpCamera() {
      vm.lookAtTheCameraText = true;
      wake();
      vm.emotionSelected = false;
      // defaultDisplay();
      $timeout(function () {
        vm.lookAtTheCameraText = false;
      }, 2500);
    }
    function wake() {
      if (!emotionReaderService.isRunning) {
        emotionReaderService.setSleep(false);
        vm.detecting = true;
        isSleeping = false;
        spinnerService.spinnerOn();
      }
    }

    function selectModal() {
      sleep();

      moodSelectModal.open(vm.allEmotions, fnCallbackOk, fnCallbackCancel);
    }
    function fnCallbackOk(emotion) {
      onItemSelect(emotion);
    }
    function fnCallbackCancel() {
      //console.log("modal canceled");
    }

    function playMood() {
      var deferred = $q.defer();
      vm.bang = true;
      $timeout(function () {
        vm.throbbing = true;
      }, 500);
      spinnerService.spinnerOn();

      //console.log("Getting Tracks for: " + lastMoodId);

      moodService.asyncNotifyNewMood(lastMoodId).then(
        function () {
          spinnerService.spinnerOff();
          var explosion = document.getElementById("explosion");
          vm.throbbing = false;
          explosion.classList.add("moodExplosionLeave");
          $timeout(function () {
            vm.bang = false;
            explosion.classList.remove("moodExplosionLeave");
          }, 250);
        },
        function (errorIdentifier) {
          //console.log("moodController: playMood: warning: " + errorIdentifier.message);
          spinnerService.spinnerOff();

        }
      );



      return deferred.promise;

    }



    vm.onItemSelect = onItemSelect;
    vm.selectModal = selectModal;
    vm.wakeUpCamera = wakeUpCamera;
    vm.wake = wake;
    vm.sleep = sleep;
    vm.onItemSelected = onItemSelected;
    vm.removeHelpTips = removeHelpTips;
    vm.playMood = playMood;

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
