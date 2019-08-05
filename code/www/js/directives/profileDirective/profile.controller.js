(function () {
    'use strict';

    angular
        .module('gaddum.profileDirective')
        .controller('profileController', control);

    control.$inject = [
        '$state',
        '$q',
        'profileService',
        'profileEditModal',
        'gaddumContextMenuItem',
        'gaddumShortcutBarService',
        'ErrorIdentifier',
        '$timeout'
    ];

    function control(
        $state,
        $q,
        profileService,
        profileEditModal,
        gaddumContextMenuItem,
        gaddumShortcutBarService,
        ErrorIdentifier,
        $timeout

    ) {
        var vm = angular.extend(this, {
            scrollGenre: true,
            genresFontStyle: false

        });
        var scale = 8;
        vm.userProfile = {
            "profile": {
                "profile_id": "99999999-5500-4cf5-8d42-228864f4807a",
                "avatar_name": "Lemmon Jelly",
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

        vm.allGenres = [];
        vm.selecteGenres = [];
        vm.userGenres = "";

        vm.name = vm.userProfile.profile.avatar_name;
        vm.getName = function () {
            asyncPopulateProfile.then(
                function(){vm.name=vm.userProfile.profile.avatar_name;}
            );
        };
        vm.setName = function (name) {
            profileService.setName(name);
            setTimeout(function () {
                vm.name = profileService.asyncGetAvatarName();
                vm.encodedProfile = btoa("{\"profile\": "+JSON.stringify(vm.userProfile.profile)+"}");
            }, 0);
        };



        vm.getUserGenres = function () {
            return profileService.getUserGenres();
        }
        vm.setGenres = function (genres) {
            console.log("genres test",profileService.getUserGenres());
            profileService.setGenres(genres);
            console.log("genres test2",profileService.getUserGenres());
            setTimeout(function () {
                vm.userGenres = profileService.getUserGenres().join(", ");
                vm.encodedProfile = btoa("{\"profile\": "+JSON.stringify(vm.userProfile.profile)+"}");
                vm.genreScrollChecker();
            }, 0);
        }

        vm.encodedProfile = btoa("{\"profile\": "+JSON.stringify(vm.userProfile.profile)+"}");


        function asyncPopulateGenres() {
            var deferred = $q.defer();

            var promises = [];

            promises.push(profileService.asyncGetAllGenres());
            promises.push(profileService.asyncGetGenres());

            $q.all(promises).then(
                function success(results) {
                    vm.allGenres = results[0];
                    vm.selectedGenres = results[1];
                    vm.userGenres = vm.selectedGenres.join(", ");

                    deferred.resolve();
                },
                function fail(error) {
                    vm.allGenres = [];
                    vm.selectedGenres = [];

                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function asyncPopulateProfile() {
            var deferred = $q.defer();

            profileService.asyncGetUserProfile().then(
                function success(result) {
                    vm.userProfile = result;
                    deferred.resolve();
                },
                function fail(error) {
                    deferred.reject(error);
                }
            );


            return deferred.promise;
        }

        function asyncLaunchModal() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    var modalParams = [
                        { "allGenres": vm.allGenres },
                        { "userGenres": vm.selectedGenres },
                        { "userProfile": vm.userProfile }
                    ];
                    profileEditModal.open(modalParams, callback, refresh);
                    deferred.resolve();
                }
            );

            return deferred.promise;
        }



        vm.profileEdit = function () {
            asyncPopulateGenres().then(asyncPopulateProfile).then(asyncLaunchModal).then(function () { vm.genreScrollChecker() });
        };

        vm.saveGenreEdit = function (newGenres) {
            profileService.asyncSetGenres(newGenres);
        };


        vm.genreScrollChecker = function () {

            if (document.getElementById("genreStatic")&&vm.userGenres!=null) {

                var genreFont = document.getElementById("genreStatic").style.font;
                var genreText = vm.userGenres.join(", ");
                var maxNoScrollWidth = document.body.clientWidth - (document.getElementsByClassName("profileImageCanvas")[0].offsetWidth);

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
            var profile;
            profileService.asyncGetUserProfile().then(
                function success(result) {
                    vm.userProfile = result;
                    for (var j = 0; j < vm.userProfile.profile.avatar_graphic.length; j++) {
                        bin = vm.userProfile.profile.avatar_graphic[j].toString(2);
                        for (var x = bin.length; x < 8; x++) {
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
                    //deferred.resolve();
                },
                function fail(error) {
                    deferred.reject(error);
                }
            );
        };
        function rect(x, y, w, h, fs, ctx) {

            ctx.fillStyle = fs;
            ctx.fillRect(x * w, y * h, (w), h);
        };

        var callbackflag = false;//an idea for a flag to change the way the cancell callback runs when the confirm button is pressed

        function callback(profileDetails) {
            //update everything on screen
            vm.setName(profileDetails.name);
            vm.setAvatar_image(profileDetails.avatar_image);
            vm.setGenres(profileDetails.genres);
            vm.genreScrollChecker();

        };
        function refresh(profileDetails) {
            //refresh all the things
        };

        vm.setAvatar_image = function (avatar_image) {
            console.log("aimg", avatar_image);
            profileService.setAvatar_image(avatar_image);
            setTimeout(function () {
                vm.userProfile.profile.avatar_graphic = profileService.getAvatar_image(avatar_image);
                vm.createProfileGraphic(vm.userProfile.profile_id);
            }, 0);
        }


        function createModalList() {
            var firstVariable = "Edit Profile";
            var firstFunc = vm.profileEdit;
            var contextMenu = [];
            contextMenu[0] = gaddumContextMenuItem.build(firstVariable, firstFunc);
            vm.conMenu = contextMenu;
            console.log(vm.conMenu);
        }

        // TODO: Error Handling
        function init() {
            console.log("init");
            asyncPopulateGenres().then(asyncPopulateProfile).then(
                function () {
                    vm.genreScrollChecker();
                    
                }
            );
            createModalList();
            console.log("context",vm.conMenu);
            gaddumShortcutBarService.setContextMenu(vm.conMenu);
            console.log("profile",vm.userProfile);
        };
        init();

    }
})();