(function() {
  'use strict';

  angular
    .module('gaddum.mood',[])
    .factory('moodService', moodService)
    ;

  moodService.$inject = [
    'dataApiService',
    '$q',
    'MoodIdentifier'
  ];
  function moodService(
    dataApiService,
    $q,
    MoodIdentifier
  ) {

    var g_dictMoodExpressionDetectionCriteria = {};

    var g_arraySupportedMoodIds = [];

    var g_dictSupportedMoodIds = {};

    function asyncGetSupportedMoodIds() {
      var deferred = $q.defer();


      dataApiService.asyncGetSupportedMoodIds().then(
        function (arrayItems) {
          g_arraySupportedMoodIds = arrayItems;
          arrayItems.forEach(function (item) {
            var moodId = MoodIdentifier.buildFromObject(item);
            g_dictSupportedMoodIds[moodId.id] = moodId;
          });

          deferred.resolve(g_arraySupportedMoodIds);
        }
        ,
        deferred.reject
      );


      return deferred.promise;
    }

    function asyncGetMoodDetectionParameters(moodId, dictResult) {

      var deferred = $q.defer();


      dataApiService.asyncGetMoodDetectionParameters(moodId, dictResult).then(
        function (dictParameters) {
          //console.log("adding parameters to: " + moodId);
          dictResult[moodId] = dictParameters;
          deferred.resolve(dictResult);
        }
        ,
        deferred.reject
      );

      return deferred.promise;
    }


    function asyncGetAllMoodDetectionParameters(arrayMoodIds, dictContainer) {
      var deferred = $q.defer();
      var arrayPromises = [];
      arrayMoodIds.forEach(function (moodId) {
        //console.log("getting detection parameters for:  " + moodId.id);
        var promise = asyncGetMoodDetectionParameters(moodId.id, dictContainer);
        arrayPromises.push(promise);
      });

      $q.all(arrayPromises).then(
        function (arrayDictContainer) {
          // all of the entries are a reference to the same object, so:
          deferred.resolve(arrayDictContainer[0]);
        }, function (error) {
          //console.log("WTF???: " + JSON.stringify(error));
        });


      return deferred.promise;
    }

    function asyncInitialise() {
      var deferred = $q.defer();

      asyncGetSupportedMoodIds()
        .then(

          function (arrayMoodIds) {
            var dictContainer = {};
            return asyncGetAllMoodDetectionParameters(arrayMoodIds, dictContainer)
              .then(function (dictContainer) {
                g_dictMoodExpressionDetectionCriteria = dictContainer;
                deferred.resolve();
              });
          });
      return deferred.promise;
    }

    function getSupportedMoodIds() {
      return g_arraySupportedMoodIds;
    }


    function faceToMoodId(dictCandidateCriteria) {
      var result = null; // can be null if no moods recognised
      var arrayRecognisedMoods = [];
      var arrayMoodIds = Object.keys(g_dictMoodExpressionDetectionCriteria);



      // for each mood
      arrayMoodIds.forEach(function (mood_id) {
        //console.log("   "+ mood_id + ":")
        // get the mood's expression criteria
        // eg smile, leftEyeBrowUp
        var dictMoodExpCriteria = g_dictMoodExpressionDetectionCriteria[mood_id];
        var arrayMoodExpCriteria = Object.keys(dictMoodExpCriteria);

        var numCriteriaForMood = arrayMoodExpCriteria.length;

        if (numCriteriaForMood) {

          var countDetectedCriteria = 0;

          // for each expression criterion, smile, leftEeyeBrowUp. etc:
          arrayMoodExpCriteria.forEach(function (detectionCriterion) {

            // detection params for expression criteria: trigger_min, trigger_max
            var detectionParams = dictMoodExpCriteria[detectionCriterion];

            // candidate value e.g. value for 'smile' or 'leftEyeBrowUp'
            var value = dictCandidateCriteria[detectionCriterion];


            // do we actually have some parameters to check against?
            if (detectionParams != null) {// checks for both null and undefined

              var trigMax = parseFloat(detectionParams.trigger_max);
              var trigMin = parseFloat(detectionParams.trigger_min);

              var detected = 0;
              // do we have a value we can check?
              if (value != null) { // checks for both null and undefined

                var fValue = parseFloat(value);
                if (isNaN(fValue)) {
                  //do nothing - can't check the value
                } else {

                  if (isNaN(trigMax) && isNaN(trigMin)) {
                    // do nothing - can't check against non-existent thresholds
                  } else if (isNaN(trigMax)) {
                    // no maxmimum value, so just check min
                    if (fValue >= trigMin) {
                      detected = 1;
                    }
                  } else if (isNaN(trigMin)) {
                    // no minimum value, just check max
                    if (fValue <= trigMax) {
                      detected = 1;
                    }
                  } else {
                    // we have a range - check both
                    if ((fValue >= trigMin) && (fValue <= trigMax)) {
                      detected = 1;
                    }
                  }
                }
              }
              if(detected){
                countDetectedCriteria += 1;
                //console.log("      "  + detectionCriterion + " : " + countDetectedCriteria + " of " + numCriteriaForMood);
              }
            }
          });
          if (countDetectedCriteria == numCriteriaForMood) {
            // All comparisons passed. This mood has been recognised!
            //console.log("recognised: " + mood_id);
            arrayRecognisedMoods.push(mood_id);
          }else{
            //console.log("none recognised");
          }
        }
      });


      var numRecognisedMoods = arrayRecognisedMoods.length;

      if (numRecognisedMoods > 0) {
        // if more than one mood recognised, pick on at random
        var index = Math.floor(Math.random() * numRecognisedMoods); // returns ramdom integer from 0 to numRecognisedMoods - 1
        id = arrayRecognisedMoods[index];

        // convert to a proper moodIdentifier (contains name)
        result = g_dictSupportedMoodIds[id];
      }

      if (result) {
        //console.log("recognised: " + result.id);
      }
      return result;

    }


    function asyncMoodIdToResources(id){
      return dataApiService.asyncMoodIdToResources(id);
    }

    var service = {

      asyncInitialise: asyncInitialise,
      asyncGetSupportedMoodIds: asyncGetSupportedMoodIds,
      faceToMoodId: faceToMoodId,
      asyncMoodIdToResources: asyncMoodIdToResources

    };

    return service;
  }
})();
