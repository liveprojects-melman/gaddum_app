(function () {
  'use strict';

  angular
    .module('gaddum.models')
    .factory('CachedImage', CachedImage)
    ;

  CachedImage.$inject = [

  ];
  function CachedImage(

  ) {
    function CachedImage(web_uri, base64_image) {
      // Public properties, assigned to the instance ('this')
      
      this.web_uri = web_uri;
      this.base64_image = base64_image;


      this.getWebUri = function () {
        return this.web_uri;
      }

      this.getBase64Image = function () {
        return this.base64_image;
      }



    }

    /** 
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    CachedImage.build = function (web_uri, base64_image) {

      if (!web_uri) web_uri = "";
      if (!base64_image) base64_image = "";
   

      return new CachedImage(
        web_uri, base64_image
      );


    };

    CachedImage.buildFromObject = function (incoming) {
      var result = new CachedImage();

      result = angular.merge(result, incoming);

      return result;

    };


    /**
     * Return the constructor function
     */
    return CachedImage;

  }
})();
