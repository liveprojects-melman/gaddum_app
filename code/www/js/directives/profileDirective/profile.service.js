(function () {
    'use strict';

    angular
        .module('gaddum.profileDirective')
        .factory('profileService', profileService);

        profileService.$inject = [
            'gaddumMusicProviderService',
            '$q',
            '$timeout'
        ];

    function profileService(
        gaddumMusicProviderService,
        $q,
        $timeout
    ){
        function blank(){

        }
        var service= {
            blank:blank,
            
        };

        var userProfile = {
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



        var userGenres=["Jazz","Ska"];

        service.asyncGetAllGenres = function(){
            return gaddumMusicProviderService.asyncGetSupportedGenres();
        };


        service.asyncSetGenres= function(newGenres){
            return gaddumMusicProviderService.asyncSetGenres(newGenres);
        };
        

        service.asyncGetGenres= function(){
            return gaddumMusicProviderService.asyncGetGenres();
        };

        service.asyncGetUserProfile= function() {

            var deferred = $q.defer();
            $timeout( 
                function(){
                    deferred.resolve(userProfile);
                });

            return deferred.promise;
        };

        service.getProfileAsString=function(){
            return JSON.stringify(userProfile);
        };

        service.getUsername=function(){
            return userProfile.profile.avatar_name;
        };

        service.getAvatar_image=function(){
            return userProfile.profile.avatar_graphic;
        };



        service.setName=function(name){
            userProfile.profile.avatar_name=name;
        }

        service.setGenres=function(genres){
            userGenres=genres;
        }

        service.setAvatar_image=function(image){
            userProfile.profile.avatar_graphic=image;
        };
        

        return service;
    };
}
)()
;