(function () {
  'use strict;'
    
  angular
    .module('gaddum.main_ui')
    .factory('settingsUserService', settingsUserService)
    ;

  settingsUserService.$inject = [
    
  ];
  function settingsUserService(
    
  ) {

   
      function getSupportedSettings(){
          console.log("userSettings");
          
      }
      function componentsLicenses(){
          return "we got these things called licenses?";
      }
      function projectPersonnel(){
          return "Kei Gibbings, J.T, D.M, L.C";
      }
      function gaddumLink(){
          return "gaddum Link Here";
      }
    var service = {
        getSupportedSettings:getSupportedSettings,
        componentsLicenses:componentsLicenses,
        projectPersonnel:projectPersonnel,
        gaddumLink:gaddumLink
    };

    return service;
  }
})();
