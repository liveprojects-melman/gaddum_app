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
//      console.log(vm.params[2]);
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
//      console.log("genres",vm.params[0].allGenres);
      var myTimeout = setTimeout(function() {
        /* vm.params[0].allGenres.forEach(function(genre) {
          label = document.getElementById("checkbox_" + genre.Name).querySelector("input"); */
/*           if (vm.params[1].userGenres.includes(genre.genre)) {
            label.checked = true;
            genre.value = true;
//            console.log("true");
          } else {
            label.checked = false;
//            console.log("false");
          } */
/*           vm.params[1].userGenres.forEach(function(userGenre){
            console.log(label.checked,userGenre);
            if (userGenre.Name==genre.Name) {
              labal.checked=true;
            };
          });
          genresCheckboxModal.setGenre(vm.params[0].allGenres.genres);
        }); */
        if (vm.params[1] != null&&vm.params[1]!=[]) {


          vm.params[0].allGenres.forEach(function (genre) {
            label = document.getElementById("checkbox_" + genre.Name).querySelector("input");
            if (genre.Value) {
              label.checked = true;
            } else {
              label.checked == false;
            };
            if (vm.params[1].userGenres.includes(genre.Name)) {
              label.checked = true;
              genre.Value = true;
            };
          });
        }
        genresCheckboxModal.setGenre(vm.params[0].allGenres.genres);
      /* }); */








      }, 0);
    };

    vm.modalGenreUpdate = function modalGenreUpdate(index){
//      console.log("index",index);
//      console.log("allGG",vm.params[0].allGenres);
//      console.log("agi",vm.params[0].allGenres[index]);
      vm.params[0].allGenres[index].Value=!vm.params[0].allGenres[index].Value;
      genresCheckboxModal.setGenre(vm.params[0].allGenres);
//      console.log("agi",vm.params[0].allGenres[index]);
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
