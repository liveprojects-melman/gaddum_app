(function() {
  'use strict;'

  angular
    .module('mood', [])
    .factory('moodService', moodService)
  ;

  moodService.$inject = [
    '$http'
  ];
  function moodService(
    $http
  ) {
    var service={
      emotionChosen: false,
      currentEmotion: undefined,
      EMOTIONS:{
        "0": {
          name:"Physical",
          emoji: "⚡️"
        },
        "1": {
          name: "Tired",
          emoji:"😴"
        },
        "2": {
          name: "Angry",
          emoji:"😡"
        },
        "3": {
          name: "Peaceful",
          emoji:"✌️"
        },
        "4": {
          name: "Focused",
          emoji:"😤"
        },
        "5": {
          name: "Bored",
          emoji:"🤤"
        },
        "6": {
          name: "Happy",
          emoji:"😁"
        },
        "7": {
          name: "Sad",
          emoji:"☹️"
        },
        "8": {
          name: "Crazy",
          emoji:"🤪"
        },
        "9": {
          name: "restful",
          emoji:"🛌"
        }
      }
    };

    return service;
  }
})();
