(function () {
  'use strict';

  angular
    .module('modalsProfile')
    .controller('profileEditModalController', profileEditModalController);

  profileEditModalController.$inject = [
    'profileEditModal',
    '$scope'

  ];

  function profileEditModalController(
    profileEditModal,
    $scope
  ) {
    var vm = angular.extend(this, {
      showGenres: false,
    });
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
    /* var fullName=vm.params[2].userProfile.profile.avatar_name;
    var newGenres=vm.params[0].allGenres; */
    var fullName;
    var newGenres=[];
    $scope.profileEditModal = profileEditModal;
    function init() {
      vm.params = profileEditModal.getParams();
      fullName=vm.params[2].userProfile.profile.avatar_name;
      newGenres=vm.params[1].userGenres;
      console.log(vm.params);
    }
    init();
    vm.toggleGenres = function () {
      vm.showGenres = !vm.showGenres;
      if (vm.showGenres) {
        vm.matchCheckboxes();
      } else{
      vm.checkboxCheck();
      }
    };

    vm.newName = function () {
      var fname = fnames[Math.floor(Math.random() * fnames.length)];
      var lname = lnames[Math.floor(Math.random() * lnames.length)];
      fullName= fname+" "+lname;
      vm.params[2].userProfile.profile.avatar_name = fullName;
    };

    vm.checkboxCheck=function(){
      var label;
      newGenres=[];
      vm.params[0].allGenres.forEach(function checkboxCheckCallback(genre) {
        label=document.getElementById("checkbox_"+genre).querySelector("input");
        console.log(label.checked);
        if (label.checked==true) {
          newGenres.push(genre);
        }
      });
      console.log("new");
      console.log(newGenres);
      console.log("old");
      console.log(vm.params[1].userGenres);

      vm.params[1].userGenres=newGenres;
    };

    vm.getGenresAsString=function(){
      return vm.params[1].userGenres.join(", ");
    };

    vm.matchCheckboxes=function(){
      var label;
      vm.params[0].allGenres.forEach(genre => {
        label=document.getElementById("checkbox_"+genre).querySelector("input");
        console.log(label.checked);
        if (vm.params[1].userGenres.includes(genre)) {
          label.checked=true;
        } else{
          label.checked=false;
        }
      });
    };

    vm.returnData=function(){
      var newData={
        "name":fullName,
        "genres":newGenres
      };
      console.log(newData);
     /*  newData.name="q";
      newData.genres=["music"]; */
      profileEditModal.callback(newData);
      profileEditModal.close();
    };

    vm.cancel=function(){
      profileEditModal.cancel();
      profileEditModal.close();
    };

  }
})();
