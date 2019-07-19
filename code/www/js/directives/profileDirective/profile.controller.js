(function () {
  'use strict';

  angular
      .module('gaddum.profileDirective')
      .controller('profileController', control);

  control.$inject = [
      '$state',
      'profileService',
      'profileEditModal'
  ];

  function control(
      $state,
      profileService,
      profileEditModal

  ) {
      var vm = angular.extend(this, {
          /* genres:"Country,Bluegrass,Electroswing,nuJazz,Soul" */
          scrollGenre:true

      });
      var scale = 8;
      vm.userProfile = {
          "profile": {
              "profile_id": "99999999-5500-4cf5-8d42-228864f4807a",
              "avatar_name": "Lemon Jelly",
              "avatar_graphic": [
                  0,
                  102,
                  102,
                  24,
                  24,
                  66,
                  126,
                  0
              ],
              device_id: "dJUr6sA28ZY:A9A91bH-chjJ8lcq61ofrjoHjak3q6nCFALPGytdEsLzh2DacCx7ihhZHxd6pPSXYMhtx4MlcQekn1rzjB7c809aNzivPFu5jhA-SR6FWbvzfBsO8ySo6um8DVA9dgOgokzz0QU5vbEf"
          }
      };

      /* vm.userGenres = [
          " Country",
          " Bluegrass",
          " Electroswing",
          " Jazz",
          " Soul",
          " Funk",
          " Disco",
          " Grime",
          " House",
          " Techno",
          " RnB",
          " Classical",
          " Opera",
          " Reggae",
      ] */
      vm.name=profileService.getUsername();
      vm.getName=function(){
          return profileService.getUsername();
      }
      vm.setName=function(name){
        profileService.setName(name);
          setTimeout(function(){ 
              vm.name=profileService.getUsername(); 
              vm.encodedProfile = btoa(profileService.getProfileAsString());
              //$scope.$apply(); 
          }, 0);
      }


      vm.userGenres=profileService.getUserGenres().join(", "); 
      vm.getUserGenres=function(){
          return profileService.getUserGenres();
      }
      vm.setGenres=function(genres){
          profileService.setGenres(genres);
          setTimeout(function(){
               vm.userGenres=profileService.getUserGenres().join(", "); 
               vm.encodedProfile = btoa(profileService.getProfileAsString());
               //$scope.$apply();                  
              }, 0);
      }

      /* vm.encodedProfile = btoa(JSON.stringify(vm.userProfile)); */
      vm.encodedProfile = btoa(profileService.getProfileAsString());


      vm.profileEdit= function(){
          //modal
          var allGenres=profileService.getAllGenres();
          var userGenres=profileService.getUserGenres();
          var modalParams=[
              {"allGenres":allGenres},
              {"userGenres":userGenres},
              {"userProfile":profileService.getUserProfile()}
          ];
          profileEditModal.open(modalParams,callback,refresh);
          //var,ok,c

          /* containerService.editGenres(["Hardbass"]); */
          vm.getUserGenres=profileService.getUserGenres().toString();
          vm.genreScrollChecker();
      };

      vm.saveGenreEdit=function(newGenres){
        profileService.editGenres(newGenres);
      };

      

      vm.genreScrollChecker = function () {
          /* vm.scrollGenre=false;
          vm.scrollGenre=true;
          vm.genreWidth = document.getElementById("genresText").offsetWidth;
          vm.containerWidth = document.getElementById("nameHeader").offsetWidth;
          vm.genreHeight= document.getElementById("genreStatic").offsetHeight;
          if (vm.genreWidth > (vm.containerWidth-80)||(vm.genreHeight>30)) {
              //console.log("Genre too big");
              vm.scrollGenre=true;
          } else{
              //console.log("Genre small");
              vm.scrollGenre=false;
          } */

          if (document.getElementById("genreStatic")) {



              var genreFont = document.getElementById("genreStatic").style.font;
              var genreText = profileService.getUserGenres().join(", ");
              var genreStatic = document.getElementById("genreStatic").offsetWidth;
              var maxNoScrollWidth = document.body.clientWidth - (document.getElementsByClassName("profileImageCanvas")[0].offsetWidth);
              /* console.log(textWidth(genreText, genreFont) + ">" + maxNoScrollWidth + "then scroll"); */



              if (textWidth(genreText, genreFont) > maxNoScrollWidth) {
                  vm.scrollGenre = true;
              } else {
                  vm.scrollGenre = false;
              }
          }
      };

      function textWidth(text, fontProp) {
        var tag = document.createElement("div");
        tag.style.position = "absolute";
        tag.style.left = "-99in";
        tag.style.whiteSpace = "nowrap";
        tag.style.font = fontProp;
        tag.innerHTML = text;
    
        document.body.appendChild(tag);
    
        var result = tag.clientWidth;
    
        document.body.removeChild(tag);
    
        return result;
    }

      vm.createProfileGraphic = function (id) {
          var canvas = document.getElementsByClassName("profileImageCanvas");
          canvas = canvas[canvas.length - 1];
          var ctx = canvas.getContext('2d');
          var nx = Math.floor(canvas.width / scale);
          var ny = Math.floor(canvas.height / scale);
          var bin;

          for (var j = 0; j < profileService.getUserProfile().profile.avatar_graphic.length; j++) {
              bin = profileService.getUserProfile().profile.avatar_graphic[j].toString(2);
              for (let x = bin.length; x < 8; x++) {
                  bin = "0" + bin;
              }
              for (var k = 0; k < bin.length; k++) {
                  if (bin[k] == "1") {
                      rect(k, j, nx, ny, '#000000', ctx);
                  } else {
                      rect(k, j, nx, ny, '#ffffff', ctx);
                  }
              }
          }
      };
      function rect(x, y, w, h, fs, ctx) {

          ctx.fillStyle = fs;
          ctx.fillRect(x * w, y * h, (w), h);
      };

      var callbackflag=false;//an idea for a flag to change the way the cancell callback runs when the confirm button is pressed

      function callback(profileDetails){
          //update everything on screen
          vm.setName(profileDetails.name);
          vm.setGenres(profileDetails.genres);
      };
      function refresh(profileDetails){
          //refresh all the things
      };


      // TODO: Error Handling
      function init() {
          vm.getUserGenres;
          vm.genreScrollChecker();
          setInterval(function() {
              vm.genreScrollChecker();
          }, 100);
      };
      init();
  }
})();