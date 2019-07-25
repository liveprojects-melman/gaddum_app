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
      showGenres: false,
    });
    var scale = 8;
    vm.displayImage;
    var newGenres = [];
    
    $scope.genresCheckboxModal = genresCheckboxModal;
    function init() {
      vm.params = genresCheckboxModal.getParams();
      console.log("params!",vm.params);
      console.log(vm.params[2]);
      //document.getElementsByClassName('modalGenresCheckboxes').style.top=vm.params[2];
    }
    init();
    
    vm.checkboxCheck = function () {
      var label;
      newGenres = [];
      vm.params[0].allGenres.genres.forEach(function(genre) {
        label = document.getElementById("checkbox_" + genre.genre).querySelector("input");
        console.log(genre, label.checked, label);
        if (label.checked == true) {
          newGenres.push(genre.genre);
        }
      });
      console.log("new");
      console.log(newGenres);
      console.log("old");
      console.log(vm.params[1].userGenres);
    }

    vm.getGenresAsString = function () {
      return vm.params[1].userGenres.join(", ");
    }

    vm.matchCheckboxes = function () {
      var label;
      setTimeout(function() {
        vm.params[0].allGenres.genres.forEach(function(genre) {
          label = document.getElementById("checkbox_" + genre.genre).querySelector("input");
          console.log(label.checked);
          if (vm.params[1].userGenres.includes(genre.genre)) {
            label.checked = true;
            genre.value=true;
            console.log("true");
          } else {
            label.checked = false;
            console.log("false");
          }
          genresCheckboxModal.setGenre(vm.params[0].allGenres.genres);
        });
      }, 0);
    }

    vm.modalGenreUpdate=function(index){
      vm.params[0].allGenres.genres[index].value=!vm.params[0].allGenres.genres[index].value;
      genresCheckboxModal.setGenre(vm.params[0].allGenres.genres);
    }

    vm.returnData = function () {
      vm.checkboxCheck();
      var newData = {        
        "genres": newGenres        
      };    
      genresCheckboxModal.callback(newData);
      genresCheckboxModal.close();
    }

    vm.cancel = function () {
      genresCheckboxModal.cancel();
      genresCheckboxModal.close();
    }
  }
})();