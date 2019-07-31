(function () {
  'use strict';

  angular
    .module('genresCheckboxModalsModule')
    .controller('genresCheckboxModalController', genresCheckboxModalController);

  genresCheckboxModalController.$inject = [
    'genresCheckboxModal',
    '$scope',
    'editImageModal'
  ];

  function genresCheckboxModalController(
    genresCheckboxModal,
    $scope,
    editImageModal
  ) {
    var vm = angular.extend(this, {
      showGenres: false
    });
    var scale = 8;
    vm.displayImage = undefined;
    var newGenres = [];

    $scope.genresCheckboxModal = genresCheckboxModal;
    function init() {
      vm.params = genresCheckboxModal.getParams();
      console.log(vm.params[2]);
    }
    init();

    vm.checkboxCheck = function checkboxCheck() {
      var label;
      newGenres = [];
      vm.params[0].allGenres.genres.forEach(function(genre) {
        label = document.getElementById("checkbox_" + genre.genre).querySelector("input");
        //console.log(genre, label.checked, label);
        if (label.checked === true) {
          newGenres.push(genre.genre);
        }
      });
    };

    vm.getGenresAsString = function getGenresAsString() {
      return vm.params[1].userGenres.join(", ");
    };

    vm.matchCheckboxes = function matchCheckboxes() {
      var label;
      var myTimeout = setTimeout(function() {
        vm.params[0].allGenres.genres.forEach(function(genre) {
          label = document.getElementById("checkbox_" + genre.genre).querySelector("input");
          console.log(label.checked);
          if (vm.params[1].userGenres.includes(genre.genre)) {
            label.checked = true;
            genre.value = true;
//            console.log("true");
          } else {
            label.checked = false;
//            console.log("false");
          }
          genresCheckboxModal.setGenre(vm.params[0].allGenres.genres);
        });
      }, 0);
    };

    vm.modalGenreUpdate = function modalGenreUpdate(index){
      vm.params[0].allGenres.genres[index].value=!vm.params[0].allGenres.genres[index].value;
      genresCheckboxModal.setGenre(vm.params[0].allGenres.genres);
    };

    vm.returnData = function returnData() {
      vm.checkboxCheck();
      var newData = {
        "genres": newGenres
      };
      genresCheckboxModal.callback(newData);
      genresCheckboxModal.close();
    };

    vm.cancel = function cancel() {
      genresCheckboxModal.cancel();
      genresCheckboxModal.close();
    };
  }
})();
