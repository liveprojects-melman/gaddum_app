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
        '$timeout',
        'AvatarGraphic'
    ];

    function control(
        $state,
        $q,
        profileService,
        profileEditModal,
        gaddumContextMenuItem,
        gaddumShortcutBarService,
        ErrorIdentifier,
        $timeout,
        AvatarGraphic

    ) {
        var vm = angular.extend(this, {
            scrollGenre: true,
            genresFontStyle: false,
            displayGenres:""
            

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
                    102,
                    102,
                    0
                  ],
                "device_id": "dJUr6sA28ZY:A9A91bH-chjJ8lcq61ofrjoHjak3q6nCFALPGytdEsLzh2DacCx7ihhZHxd6pPSXYMhtx4MlcQekn1rzjB7c809aNzivPFu5jhA-SR6FWbvzfBsO8ySo6um8DVA9dgOgokzz0QU5vbEf"
            }
        };

        vm.allGenres = [];
        vm.selecteGenres = [];
        vm.userGenres = "";

        
        vm.getName = function () {
            asyncPopulateProfile().then(
                function success(){
                    vm.name=vm.userProfile.profile.avatar_name;
                }
            );
        };
        vm.setName = function (name) {
            profileService.asyncSetAvatarName(name).then(
                function () {
                    //console.log("SET NAME done");;
                    profileService.asyncGetAvatarName().then(
                        function success(result){
                            //console.log("new name",result)
                            vm.name=result;
                        }
                    )
                });
            setTimeout(function () {
                vm.name = profileService.asyncGetAvatarName();//change
                vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), avatar_graphic_colour:vm.userProfile.avatar_graphic.getColour(), device_id: vm.userProfile.push_device_id}) + "}");
            }, 0);
        };



        vm.getUserGenres = function () {
            return profileService.getUserGenres();
        }
        vm.setGenres = function (genres) {
            //console.log("genres test",profileService.asyncGetGenres());
            profileService.asyncSetGenres(genres);
            //console.log("genres test2",profileService.asyncGetGenres());
            setTimeout(function () {
                vm.userGenres = genres;
                vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), avatar_graphic_colour:vm.userProfile.avatar_graphic.getColour(), device_id: vm.userProfile.push_device_id}) + "}");
                vm.genreScrollChecker();
            }, 0);
        }

        //vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), push_device_id: vm.userProfile.push_device_id}) + "}");


        function asyncPopulateGenres() {
            var deferred = $q.defer();

            var promises = [];

            promises.push(profileService.asyncGetAllGenres());
            promises.push(profileService.asyncGetGenres());

            $q.all(promises).then(
                function success(results) {
                    vm.allGenres = results[0];
                    vm.selectedGenres = results[1];
                    vm.userGenres = vm.selectedGenres/* .join(", ") */;
                    vm.displayGenres=vm.userGenres.join(", ");
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
                    vm.name=result.avatar_name;
                    vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), avatar_graphic_colour:vm.userProfile.avatar_graphic.getColour(), device_id: vm.userProfile.push_device_id}) + "}");
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
                    if (vm.checkGraphic(vm.userProfile.avatar_graphic.values)) {
                        vm.userProfile.avatar_graphic.values=[0,102,102,24,24,102,102,0];
                        vm.userProfile.avatar_graphic.colour="#FF00FF";
                    }
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

        vm.checkGraphic = function (gValues) {
            gValues.forEach(function (row) {
                if (row!=0) {
                    return false;
                }
            });
            return true;

        };



        vm.profileEdit = function () {
            asyncPopulateGenres().then(asyncPopulateProfile).then(asyncLaunchModal).then(function () { vm.genreScrollChecker() });
        };

        vm.saveGenreEdit = function (newGenres) {
            profileService.asyncSetGenres(newGenres);
        };


        vm.genreScrollChecker = function () {
            vm.displayGenres=vm.userGenres.join(", ");
            if (document.getElementById("genreStatic")&&vm.userGenres!=null&&vm.userGenres!=""&&vm.userGenres.length!=0) {
                //console.log("scroll genres",vm.userGenres);
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

        vm.createProfileGraphic = function () {
            var canvas = document.getElementsByClassName("profileImageCanvas");
            canvas = canvas[canvas.length - 1];
            var ctx = canvas.getContext('2d');
            var nx = Math.floor(canvas.width / scale);
            var ny = Math.floor(canvas.height / scale);
            var bin;
            var profile;
            profileService.asyncGetUserProfile().then(
                function success(result) {
                    var graphic = result.avatar_graphic.getValues();
                    var colour=result.avatar_graphic.getColour();
                    for (var j = 0; j < graphic.length; j++) {
                        bin = graphic[j].toString(2);
                        for (var x = bin.length; x < 8; x++) {
                            bin = "0" + bin;
                        }
                        for (var k = 0; k < bin.length; k++) {
                            if (bin[k] == "1") {
                                rect(k, j, nx, ny, colour, ctx);
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
            vm.setAvatar_image(profileDetails.avatar_image,profileDetails.avatar_image_colour);
            vm.setGenres(profileDetails.genres);
            vm.genreScrollChecker();
            profileService.setModalOpenFlag(false);

        };
        function refresh(profileDetails) {
            profileService.setModalOpenFlag(false);
            //refresh all the things
        };

        vm.setAvatar_image = function (avatar_image,image_colour) {
            //console.log("aimg", avatar_image);
            avatar_image=AvatarGraphic.build(image_colour,avatar_image);
            //profileService.asyncSetAvatarGraphic(avatar_image);
            setTimeout(function () {
                profileService.asyncSetAvatarGraphic(avatar_image).then(
                    function success(result) {
                        //console.log("presult",result);
                vm.userProfile.avatar_graphic = avatar_image;
                /* vm.createProfileGraphic(vm.userProfile.profile_id); */
                vm.createProfileGraphic(avatar_image);
                    },
                    function fail(error) {
                        deferred.reject(error);
                    })
            }, 0);
        }


        function createModalList() {
            var firstVariable = "Edit Profile";
            var firstFunc = vm.profileEdit;
            var contextMenu = [];
            contextMenu[0] = gaddumContextMenuItem.build(firstVariable, firstFunc);
            vm.conMenu = contextMenu;
            //console.log(vm.conMenu);
        }

        // TODO: Error Handling
        function init() {
            //console.log("init");
            vm.name = vm.userProfile.profile.avatar_name;
        /*     asyncPopulateGenres().then(function () {
                
            }); */
            asyncPopulateGenres().then(
                asyncPopulateProfile()).then(function success(results) {
                    vm.genreScrollChecker()
                    //console.log("!!!!!!!",vm.userProfile);
                    vm.checkGraphic(vm.userProfile.avatar_graphic.values)
                    //if (vm.checkGraphic(vm.userProfile.avatar_graphic.values)) {
                    if ((vm.userProfile.avatar_name == null || vm.userProfile.avatar_name == "") && profileService.getOpenModalFlag() == false) {
                        profileService.setModalOpenFlag(true);
                        vm.profileEdit();
                    }
                },
                    function fail(error) {
                        console.log("FAIL!!!!!!!");
                    }
                );



            createModalList();
            console.log("context", vm.conMenu);
            gaddumShortcutBarService.setContextMenu(vm.conMenu);
            console.log("profile", vm.userProfile);

        };
        init();

    }
})();