//module definition
(function () {
    'use strict';

    angular
        .module('gaddum.postcode', [
        ])
        .factory('postcodeService', postcodeService);

    postcodeService.$inject = [
        '$q',
        '$http'

    ];
    function postcodeService(
        $q,
        $http
    ) {
        

        CONSTANTS = {
            NO_GEOLOCATION_OBJECT: "No access to geolocation",
            BAD_LOCATION_OBJECT: "Bad location object",
            BAD_POSTCODE: "Bad postcode"
        }

      


        // wrapper for locationToPostcode
        function getPostcode(location, radius_m) {
            return service.locationToPostcode(location, radius_m, 1);
        };

        // coords: an object with a 'latitude' and 'longitude' property
        // radius: integer specifying radius (optional)
        // limit: maximum result count (optional)
        // after promise: returns a list of postcode objects
        function locationToPostcode(coords, requested_radius, requested_limit) {
            var defer = $q.defer();

            var limit = Math.min(requested_limit, 99); // API sets maximum 99 as limit
            var radius = Math.min(requested_radius, 1999); // API sets maximum radius of 1999

            var requestUrl = "";
            if (angular.isObject(coords) === true) {
                if ((coords.latitude) && (coords.longitude)) {
                    requestUrl = "https://api.postcodes.io/postcodes?lon=" + coords.longitude + "&lat=" + coords.latitude;
                }
                if ((angular.isDefined(radius) === true) && (Number.isInteger(radius) === true)) {
                    requestUrl = requestUrl + "&radius=" + radius;
                }
                if ((angular.isDefined(limit) === true) && (Number.isInteger(limit) === true)) {
                    requestUrl = requestUrl + "&limit=" + limit;
                }
            }
            if (requestUrl !== "") {
                $http.get(requestUrl)
                    .then(
                        function success(data, status, headers, config) {
                            defer.resolve(data);
                        },
                        function error(data, status, headers, config) {
                            throw new Error(status);
                        });
                return defer.promise;
            };
            throw new Error(service.BAD_LOCATION_OBJECT, coords);
        };

        function getPostcodesFromPartial(partial) {
            var defer = $q.defer();
            if (partial.length > 0) {
                var requestUrl = "https://api.postcodes.io/postcodes?q=" + partial;
                $http.get(requestUrl).then(
                    function getPostcodeFromPartialResponse(data) {
                        defer.resolve(data.data.result);
                    },
                    function getPostcodeFromPartialResponseError(error) {
                        defer.reject(error);
                    }
                );
            } else {
                throw "getPostcodesFromPartial - called with nothing";
            }
            return defer.promise;
        };

        // postcode: a string
        // after promise: returns a location object (with latitude and longitude properties)
        function getLocation(postcode) {
            var defer = $q.defer();

            var requestUrl = "";
            if (angular.isDefined(postcode)) {
                requestUrl = "https://api.postcodes.io/postcodes/" + postcode;
            }
            if (requestUrl !== "") {
                $http.get(requestUrl)
                    .then(
                        function success(data, status, headers, config) {
                            //console.log( "postcodeService.getLocation:", data );
                            defer.resolve(data)
                        },
                        function error(data, status, headers, config) {
                            throw new Error(status);
                            defer.reject(status);
                        });
                return defer.promise;
            }
            throw new Error(service.BAD_POSTCODE);
        };


        function asyncPostcodeToLocation(postcode){
            var deferred = $q.defer();
            
            getLocation(postcode).then(
                function onSuccess(coords){
                    var result = Location.build(coords.latitude, coords.longitude);
                    deferred.resolve(result);
                },
                function onError(err){
                    var error = ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "problem contacting postcode service");
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }



        function asyncLocationToPostcode(location){
            return getPostcode(location, 10);
        }


        function asyncAutocompletePostcode(partial){
            return getPostcodesFromPartial(partial)
        }

        var service = {
            asyncLocationToPostcode: asyncLocationToPostcode,
            asyncPostcodeTolocation: asyncPostcodeToLocation,
            asyncAutocompletePostcode: asyncAutocompletePostcode
        };






        return service;
    }
})();