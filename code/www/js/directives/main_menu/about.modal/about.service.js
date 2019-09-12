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


    function appVersion() {
      //   console.log(AppVersion.version);
      return AppVersion.version;
    }
    function componentsLicenses() {
      var licenseArray = {licenses:[
        {"name":"android-versions","version":"^1.4.0 ","link":"https://github.com/dvoiss/android-versions#readme "},
        {"name":"clean","version":"4.0.2  ","link":"https://github.com/kaelzhang/node-clean#readme"},
        {"name":"cordova-android","version":"6.3.0  ","link":"https://github.com/kaelzhang/node-clean#readme"},
        {"name":"cordova-browser","version":"5.0.4  ","link":"https://github.com/apache/cordova-browser#readme"},
        {"name":"cordova-custom-config","version":"^5.1.0  ","link":"https://github.com/dpa99c/cordova-custom-config#readme"},
        {"name":"cordova-ios","version":"4.5.5  ","link":"https://github.com/apache/cordova-ios#readme"},
        {"name":"cordova-plugin-add-swift-support","version":"^1.6.1  ","link":"https://github.com/akofman/cordova-plugin-add-swift-support"},
        {"name":"cordova-plugin-app-version","version":"^0.1.9  ","link":"https://github.com/whiteoctober/cordova-plugin-app-version#readme"},
        {"name":"cordova-plugin-appversion","version":"^1.0.0  ","link":"https://github.com/Rareloop/cordova-plugin-app-version"},
        {"name":"cordova-plugin-compat","version":"^1.2.0  ","link":"http://github.com/apache/cordova-plugin-compat#readme"},
        {"name":"cordova-plugin-console","version":"^1.1.0  ","link":"https://github.com/apache/cordova-plugin-console#readme"},
        {"name":"cordova-plugin-customurlscheme","version":"^4.4.0  ","link":"https://github.com/EddyVerbruggen/Custom-URL-scheme#readme"},
        {"name":"cordova-plugin-device","version":"^1.1.7  ","link":"https://github.com/apache/cordova-plugin-device#readme"},
        {"name":"cordova-plugin-file","version":"^4.3.3  ","link":"https://github.com/apache/cordova-plugin-file#readme"},
        {"name":"cordova-plugin-geolocation","version":"^2.4.3  ","link":"https://github.com/apache/cordova-plugin-geolocation#readme"},
        {"name":"cordova-plugin-inappbrowser","version":"^1.7.2  ","link":"https://github.com/apache/cordova-plugin-inappbrowser#readme"},
        {"name":"cordova-plugin-network-information","version":"^2.0.2  ","link":"https://github.com/apache/cordova-plugin-network-information#readme"},
        {"name":"cordova-plugin-screen-orientation","version":"^2.0.2  ","link":"https://github.com/apache/cordova-plugin-screen-orientation#readme"},
        {"name":"cordova-plugin-splashscreen","version":"^4.1.0  ","link":"https://cordova.apache.org/"},
        {"name":"cordova-plugin-statusbar","version":"^2.4.3  ","link":"https://github.com/apache/cordova-plugin-statusbar#readme"},
        {"name":"cordova-plugin-whitelist","version":"^1.3.4  ","link":"https://github.com/apache/cordova-plugin-whitelist#readme"},
        {"name":"cordova-spotify","version":"^0.5.8  ","link":"https://github.com/Festify/cordova-spotify#readme"},
        {"name":"cordova-spotify-oauth","version":"^0.1.11  ","link":"https://github.com/Festify/cordova-spotify-oauth#readme"},
        {"name":"cordova-sqlite-storage","version":"^3.2.1  ","link":"https://github.com/xpbrew/cordova-sqlite-storage"},
        {"name":"cordova.plugins.diagnostic","version":"^3.9.2  ","link":"https://github.com/dpa99c/cordova-diagnostic-plugin#readme"},
        {"name":"es6-promise-plugin","version":"^4.2.2  ","link":"https://github.com/vstirbu/PromisesPlugin#readme"},
        {"name":"gulp","version":"^4.0.2  ","link":"https://gulpjs.com"},
        {"name":"gulp-clean-css","version":"^4.2.0  ","link":"https://github.com/scniro/gulp-clean-css#readme"},
        {"name":"gulp-minify-css","version":"^1.2.4  ","link":"https://github.com/scniro/gulp-clean-css#readme"},
        {"name":"gulp-rename","version":"^1.4.0  ","link":"https://github.com/hparra/gulp-rename"},
        {"name":"ionic-plugin-keyboard","version":"^2.2.1  ","link":"https://github.com/driftyco/ionic-plugin-keyboard#readme"},
        {"name":"jquery","version":"^3.4.1  ","link":"https://jquery.com"},
        {"name":"natives","version":"^1.1.6  ","link":"https://github.com/addaleax/natives#readme"},
        {"name":"ngtouch","version":"^1.0.1  ","link":"https://github.com/nglar/ngTouch#readme"},
        {"name":"sass","version":"^1.22.9  ","link":"https://github.com/sass/dart-sass"},
        {"name":"uk.co.workingedge.cordova.plugin.sqliteporter","version":"^1.1.0 ","link":"https://github.com/dpa99c/cordova-sqlite-porter#readme"}]};
      //return "we got these things called licenses?";
      return licenseArray;
    }
    function projectPersonnel() {
      return "Laurie Cooper, Kei Gibbings, Dave Mee, Jothan Taylor";
    }
    function gaddumLink() {
      return "Gaddum";
    }
    var service = {
      appVersion: appVersion,
      componentsLicenses: componentsLicenses,
      projectPersonnel: projectPersonnel,
      gaddumLink: gaddumLink
    };

    return service;
  }
})();
