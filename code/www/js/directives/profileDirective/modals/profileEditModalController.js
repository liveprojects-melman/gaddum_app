(function () {
  'use strict';

  angular
    .module('modalsProfile')
    .controller('profileEditModalController', profileEditModalController);

  profileEditModalController.$inject = [
    'profileEditModal',
    '$scope',
    'editImageModal',
    'genresCheckboxModal'

  ];

  function profileEditModalController(
    profileEditModal,
    $scope,
    editImageModal,
    genresCheckboxModal
  ) {
    var vm = angular.extend(this, {
      showGenres: false,
      updateGenres:[]
    });
    var scale = 8;
    var fnames = [
      "Apple",
      "Apricot",
      "Avocado",
      "Banana",
      "Blackberry",
      "Blueberry",
      "Boysenberry",
      "Breadfruit",
      "Elderberry",
      "Limeberry",
      "Cranberry",
      "Cantaloupe",
      "Cherry",
      "Citron",
      "Citrus",
      "Coconut",
      "Date",
      "Elderberry",
      "Fig",
      "Grape",
      "Grapefruit",
      "Jackfruit",
      "Guava",
      "Hawthorn",
      "Kiwi",
      "Lemon",
      "Lime",
      "Mango",
      "Melon",
      "Mulberry",
      "Nectarine",
      "Orange",
      "Papaya",
      "Passionfruit",
      "Peach",
      "Pear",
      "Pineapple",
      "Plum",
      "Prune",
      "Raisin",
      "Raspberry",
      "Tangerine",
      "Loquat",
      "Vanilla",
      "Dragon-Fruit"
    ];

    var lnames = [
      "Chutney",
      "Conserve",
      "Compote",
      "Confit",
      "Conserve",
      "Curd",
      "Fruit-Butter",
      "Fruit-Curd",
      "Fruit-Cheese",
      "Fruit-Spread",
      "Jam",
      "Jelly",
      "Marmalade",
      "Mincemeat",
      "Picle",
      "Preserve",
      "Relish"
    ];
    vm.fullName;
    vm.displayImage;
    var newGenres = [];
    var profile;
    $scope.profileEditModal = profileEditModal;
    function init() {
      vm.params = profileEditModal.getParams();
      console.log("params!",vm.params);
      vm.fullName = vm.params[2].userProfile.profile.avatar_name;
      newGenres = vm.params[1].userGenres;
      profile = vm.params[2].userProfile.profile;
      vm.displayImage=profile.avatar_graphic;
      vm.genresAsString=vm.params[1].userGenres.join(", ");
      console.log(vm.params);
    }
    init();
    vm.toggleGenres = function () {
      vm.showGenres = !vm.showGenres;
      if (vm.showGenres) {
        vm.matchCheckboxes();
      } else {
        vm.checkboxCheck();
      }
    };

    vm.newName = function () {
      var fname = fnames[Math.floor(Math.random() * fnames.length)];
      var lname = lnames[Math.floor(Math.random() * lnames.length)];
      vm.fullName = fname + " " + lname;
    };

    vm.checkboxCheck = function () {
      var label;
      newGenres = [];
      vm.params[0].allGenres.forEach(function (genre) {
        label = document.getElementById("checkbox_" + genre).querySelector("input");
        console.log(label.checked);
        if (label.checked == true) {
          newGenres.push(genre);
        }
      });
      console.log("new");
      console.log(newGenres);
      console.log("old");
      console.log(vm.params[1].userGenres);

      vm.params[1].userGenres = newGenres;
    }

    vm.genresAsString;

    vm.getGenresAsString = function () {
      if (vm.updatedGenres != null) {
        newGenres = vm.updatedGenres;
        vm.genresAsString= vm.updatedGenres.join(", ");
      } else {
        newGenres = vm.params[1].userGenres;
        vm.genresAsString=vm.params[1].userGenres.join(", ");
      }
    }

    vm.matchCheckboxes = function () {
      var label;
      vm.params[0].allGenres.forEach(function(genre) {
        label = document.getElementById("checkbox_" + genre).querySelector("input");
        console.log(label.checked);
        if (vm.params[1].userGenres.includes(genre)) {
          label.checked = true;
        } else {
          label.checked = false;
        }
      });
    }

    vm.returnData = function () {
      var newData = {
        "name": vm.fullName,
        "genres": newGenres,
        "avatar_image":vm.displayImage//edit image 3/?
      };
      console.log(newData);
      profileEditModal.callback(newData);
      profileEditModal.close();
    }

    vm.cancel = function () {
      profileEditModal.cancel();
      profileEditModal.close();
    }

    vm.createProfileGraphic = function (id) {

      setTimeout(function () {


        console.log("profile", profile);
        console.log(document.getElementsByClassName("editPageProfileCanvas"));
        var canvas = document.getElementsByClassName("editPageProfileCanvas");


        console.log(canvas.length);
        canvas = canvas[canvas.length - 1];
        var ctx = canvas.getContext('2d');
        var nx = Math.floor(canvas.width / scale);
        var ny = Math.floor(canvas.height / scale);
        var bin;
        console.log(id);
        console.log(vm.friends);

        for (var j = 0; j < vm.displayImage.length; j++) {
          bin = vm.displayImage[j].toString(2);
          for (let x = bin.length; x < 8; x++) {
            bin = "0" + bin;
          }
          console.log(bin);
          for (var k = 0; k < bin.length; k++) {
            if (bin[k] == "1") {
              rect(k, j, nx, ny, '#000000', ctx);
            } else {
              rect(k, j, nx, ny, '#ffffff', ctx);
            }
          }
        }
      }, 0);
    };

    function rect(x, y, w, h, fs, ctx) {

      ctx.fillStyle = fs;
      ctx.fillRect(x * w, y * h, (w), h);
    };

    vm.profileImageEdit = function () {

      var modalParams = [
        {"avatar_image":vm.displayImage}

      ];
      editImageModal.open(modalParams, vm.updateImage, vm.imgUpdateCancel);
      //var,ok,c
      profileEditModal.closeCheckFalse();
    };

    vm.updateImage=function(newImage){
      //edit image 4/?
      vm.displayImage=newImage;
      vm.createProfileGraphic();
    }

    vm.imgUpdateCancel=function(image){
      //JJJJJ
      console.log(image);
      vm.displayImage=image;
      vm.createProfileGraphic();
    }
    vm.showGenreCheckboxModal = function () {
      //var checkboxPosition=document.getElementById('genreToggle').style;

      var modalParams = [
        {"allGenres":vm.params[0].allGenres},
        {"userGenres":newGenres}
        //{"checkboxPosition":checkboxPosition}
      ];
      genresCheckboxModal.open(modalParams, vm.updateGenres, vm.genresUpdateCancel);
      //var,ok,c
      profileEditModal.closeCheckFalse();

    };

    vm.updateGenres=function(genresData){
      console.log("newg",genresData);
      vm.updatedGenres=genresData.genres;                  
    }

    vm.genresUpdateCancel=function(genres){
      console.log(genres);
      var gArray =[];
      genres.forEach(function (element) {
        if (element.value) {
          gArray.push(element.genre);
        }
      });
      console.log("ga",gArray);
      vm.updatedGenres=gArray;
      vm.getGenresAsString();
    }
  }
})();