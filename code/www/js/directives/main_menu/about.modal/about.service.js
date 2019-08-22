(function () {
  'use strict;'

  angular
    .module('gaddum.main_ui')
    .factory('aboutService', aboutService)
    ;

  aboutService.$inject = [
    
  ];
  function aboutService(
    
  ) {

   
      function appVersion(){
        //   console.log(AppVersion.version);
          return AppVersion.version;
      }
      function componentsLicenses(){
          return "we got these things called licenses?";
      }
      function projectPersonnel(){
          return "Laurie Cooper, Kei Gibbings, Dave Mee, Jothan Taylor";
      }
      function gaddumLink(){
          return "Gaddum";
      }
    var service = {
        appVersion:appVersion,
        componentsLicenses:componentsLicenses,
        projectPersonnel:projectPersonnel,
        gaddumLink:gaddumLink
    };

    return service;
  }
})();
