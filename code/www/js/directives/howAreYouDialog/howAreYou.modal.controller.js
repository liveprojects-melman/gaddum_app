

(function () {
  'use strict';

  angular
    .module('gaddum.mood')
    .controller('howAreYouModalController', howAreYouModalController);

  howAreYouModalController.$inject = [
    'howAreYouModal',
    '$scope',
    '$timeout',
    'moodService',
    '$q',
    'MoodIdentifier'

  ];

  function howAreYouModalController(
    howAreYouModal,
    $scope,
    $timeout,
    moodService,
    $q,
    MoodIdentifier
  ) {
    var moodIdDict = {};
    var mc = angular.extend(this, {
      itemSelected: false,
      emotionSelected: ''
    });
    $scope.howAreYouModal = howAreYouModal;
    function init() {
      moodService.asyncGetSupportedMoodIds().then(function (supportedMoods) {
        mc.allEmotions = supportedMoods
        console.log("start", mc.allEmotions);
        mc.allEmotionsSave = mc.allEmotions;
        asyncPopulateMoodResourceDict(mc.allEmotions, moodIdDict).then(function () {
          mc.allEmotions = moodIdDict;
          console.log("heya", mc.allEmotions);
        });

        mc.params = howAreYouModal.getParams();
      });


    }
    init();

    function asyncPopulateMoodResourceDict(moodIds, candidate) {
      var deferred = $q.defer();
      var promiseArray = [];
      var count = 0;
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
          count++;
        }
      );
      $q.all(promiseArray).then(
        function (results) {
          deferred.resolve(candidate);
        }
      );


      return deferred.promise;
    }

    function selectEmo() {
      var result = null;
      console.log("end", mc.allEmotionsSave);
      mc.allEmotionsSave.forEach(function (element) {
        if (element.id === mc.emotionSelected.name) {
          result = element;
        }

      });
      console.log("result",result);
      howAreYouModal.callback(result);
      howAreYouModal.close();
    }
    function showOverlay(emotionSelected) {
      mc.emotionSelected = emotionSelected;
      mc.itemSelected = true;
      $timeout(function () {
        mc.itemSelected = false;
      }, 1000);
    }
    mc.showOverlay = showOverlay;
    mc.selectEmo = selectEmo;
  }
})();