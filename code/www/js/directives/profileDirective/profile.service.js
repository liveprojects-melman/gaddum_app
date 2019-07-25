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

        var genresList={"genres":[
            {genre:"Afrobeat",value:false},
            {genre:"Blues",value:false},
            {genre:"Lo-fi",value:false},
            {genre:"Mambo",value:false},
            {genre:"Reggae",value:false},
            {genre:"Rocksteady",value:false},
            {genre:"Dancehall",value:false},
            {genre:"Soca",value:false},
            {genre:"Ska",value:false},
            {genre:"Bluegrass",value:false},
            {genre:"Country",value:false},
            {genre:"K-pop",value:false},
            {genre:"J-pop",value:false},
            {genre:"Hiphop",value:false},
            {genre:"Techno",value:false},
            {genre:"Drill",value:false},
            {genre:"Grime",value:false},
            {genre:"House",value:false},
            {genre:"Electronic",value:false},
            {genre:"Hardbass",value:false},
            {genre:"Funk",value:false},
            {genre:"Disco",value:false},
            {genre:"Soul",value:false},
            {genre:"Motown",value:false},
            {genre:"Jazz",value:false}
        ]};

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

        service.getAvatar_image=function(){
            return userProfile.profile.avatar_graphic;
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

        service.setAvatar_image=function(image){
            userProfile.profile.avatar_graphic=image;
        };
        

        return service;
    };
}
)()
;