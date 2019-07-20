(function () {
    'use strict';

    angular
        .module('gaddum.profileDirective')
        .factory('profileService', profileService);

        profileService.$inject = [
        
         
    ];

    function profileService(
      
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

        var genresList=[
            "Afrobeat",
            "Blues",
            "Lo-fi",
            "Mambo",
            "Reggae",
            "Rocksteady",
            "Dancehall",
            "Soca",
            "Ska",
            "Bluegrass",
            "Country",
            "K-pop",
            "J-pop",
            "Hiphop",
            "Techno",
            "Drill",
            "Grime",
            "House",
            "Electronic",
            "Hardbass",
            "Funk",
            "Disco",
            "Soul",
            "Motown",
            "Jazz",
        ]

        var userGenres=["Jazz","Ska"];

        service.getAllGenres = function(){
            return genresList;
        };

        service.getUserProfile= function() {
            return userProfile;
        };

        service.getProfileAsString=function(){
            return JSON.stringify(userProfile);
        };

        service.getUsername=function(){
            return userProfile.profile.avatar_name;
        };

        service.editGenres= function(newGenres){
            userGenres=newGenres;
        };

        service.getUserGenres= function(){
            return userGenres;
        };

        service.setName=function(name){
            userProfile.profile.avatar_name=name;
        }

        service.setGenres=function(genres){
            userGenres=genres;
        }
        

        return service;
    };
}
)()
;