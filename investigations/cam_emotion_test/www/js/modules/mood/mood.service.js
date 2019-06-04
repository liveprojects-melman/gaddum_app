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
        "-": {
          name:"none",
          emoji: "🌀",
          value: undefined
        },
        "0": {
          name:"Physical",
          emoji: "⚡️",
          value: 0
        },
        "1": {
          name: "Tired",
          emoji:"😴",
          value: 1
        },
        "2": {
          name: "Angry",
          emoji:"😡",
          value: 2
        },
        "3": {
          name: "Peaceful",
          emoji:"✌️",
          value: 3,
        },
        "4": {
          name: "Focused",
          emoji:"😤",
          value: 4
        },
        "5": {
          name: "Bored",
          emoji:"🤤",
          value: 5
        },
        "6": {
          name: "Happy",
          emoji:"😁",
          value: 6
        },
        "7": {
          name: "Sad",
          emoji:"☹️",
          value: 7
        },
        "8": {
          name: "Crazy",
          emoji:"🤪",
          value: 8
        },
        "9": {
          name: "Restful",
          emoji:"🛌",
          value: 9
        }
      }
    };

    return service;
  }
})();
