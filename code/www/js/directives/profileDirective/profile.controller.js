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
        'AvatarGraphic',
        '$ionicModal',
        '$scope',
        'spinnerService',
        '$ionicSlideBoxDelegate'
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
        AvatarGraphic,
        $ionicModal,
        $scope,
        spinnerService,
        $ionicSlideBoxDelegate

    ) {
        var vm = angular.extend(this, {
            scrollGenre: true,
            genresFontStyle: false,
            displayGenres: "",
            screenWidth: 0,
            busy: true,
            name: ""


        });
        var scale = 8;
        vm.userProfile = {
            "profile_id": "99999999-5500-4cf5-8d42-228864f4807a",
            "avatar_name": "Defaulthony Nameson",
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
        };

        vm.allGenres = [];
        vm.selecteGenres = [];
        vm.userGenres = "";
        // var firstLoad = false;

        function init() {
            vm.screenWidth = screen.width;
            vm.name = vm.userProfile.avatar_name;
            vm.busy = true;
            spinnerService.spinnerOn();
            asyncPopulateGenres().then(
                asyncPopulateProfile()).then(function success(results) {
                    vm.genreScrollChecker();
                    vm.checkGraphic(vm.userProfile.avatar_graphic.values);
                    if ((vm.userProfile.avatar_name == null || vm.userProfile.avatar_name == "" || vm.userProfile.avatar_name == "Defaulthony Nameson") && profileService.getOpenModalFlag() == false) {
                        profileService.setModalOpenFlag(true);
                        // firstLoad = true;
                        vm.profileEdit();
                    };
                    vm.busy = false;
                    vm.nameTextResizer();
                    spinnerService.spinnerOff();
                },
                    function fail(error) {
                        console.log("FAIL!!!!!!!");
                        vm.busy = false;
                        vm.nameTextResizer();
                        spinnerService.spinnerOff();
                    }
                );



            createModalList();
            console.log("context", vm.conMenu);
            gaddumShortcutBarService.setContextMenu(vm.conMenu);
            console.log("profile", vm.userProfile);

        };

        vm.getName = function () {
            spinnerService.spinnerOn();
            asyncPopulateProfile().then(
                function success() {
                    vm.name = vm.userProfile.profile.avatar_name;
                    vm.nameTextResizer();
                    spinnerService.spinnerOff();
                }, function (error) {
                    spinnerService.spinnerOff();
                    console.log(error);
                }
            );
        };
        vm.setName = function (name) {
            spinnerService.spinnerOn();
            vm.name = name;
            document.getElementById("nameHeader").innerText=vm.name;
            // var deferred = $q.defer();
            return profileService.asyncSetAvatarName(name).then(
                function () {
                    spinnerService.spinnerOff();
                    setTimeout(function () {
                        vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({ profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), avatar_graphic_colour: vm.userProfile.avatar_graphic.getColour(), device_id: vm.userProfile.push_device_id }) + "}");
                        /* if(vm.userProfile.avatar_graphic.colour=="#000000"||vm.userProfile.avatar_graphic.colour==null){
                            document.getElementById("qrCodeDiv").style.visibility="hidden";
                        } else{
                            document.getElementById("qrCodeDiv").style.visibility="visible";
                        } */
                    }, 0);
                }, function (error) {
                    spinnerService.spinnerOff();
                    // deferred.reject(error);
                }
            );
        };



        vm.getUserGenres = function () {
            return profileService.getUserGenres();
        }
        vm.setGenres = function (genres) {
            //console.log("genres test",profileService.asyncGetGenres());
            spinnerService.spinnerOn();
            return profileService.asyncSetGenres(genres).then(function () {
                // setTimeout(function () {
                vm.userGenres = genres;
                vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({ profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), avatar_graphic_colour: vm.userProfile.avatar_graphic.getColour(), device_id: vm.userProfile.push_device_id }) + "}");
                /* if(vm.userProfile.avatar_graphic.colour=="#000000"||vm.userProfile.avatar_graphic.colour==null){
                    document.getElementById("qrCodeDiv").style.visibility="hidden";
                } else{
                    document.getElementById("qrCodeDiv").style.visibility="visible";
                } */
                vm.genreScrollChecker();
                // }, 0);
            }, function (error) {
                spinnerService.spinnerOff();
                console.log(error);
            }
            );
            //console.log("genres test2",profileService.asyncGetGenres());

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
                    vm.displayGenres = vm.userGenres.join(", ");
                    vm.genreScrollChecker();
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
                    angular.merge(vm.userProfile, result);
                    if (result.avatar_name != null) {
                        // setTimeout(function () { 
                            console.log("RESULT",result);
                        vm.name = result.avatar_name;
                        document.getElementById("nameHeader").innerText=vm.name;
                        /* if(firstLoad){
                            firstLoad = false;
                            // profileEdit2();
                        } */
                        //$digest here
                        //$scope.$digest();
                        // }, 0);
                    } else {
                        vm.name = "Defaulthony Nameson";
                        document.getElementById("nameHeader").innerText=vm.name;
                    }
                    vm.nameTextResizer();
                    vm.encodedProfile = btoa("{\"profile\": " + JSON.stringify({ profile_id: vm.userProfile.profile_id, avatar_name: vm.userProfile.avatar_name, avatar_graphic: vm.userProfile.avatar_graphic.getValues(), avatar_graphic_colour: vm.userProfile.avatar_graphic.getColour(), device_id: vm.userProfile.push_device_id }) + "}");
                    /* if(vm.userProfile.avatar_graphic.colour=="#000000"||vm.userProfile.avatar_graphic.colour==null){
                        document.getElementById("qrCodeDiv").style.visibility="hidden";
                    } else{
                        document.getElementById("qrCodeDiv").style.visibility="visible";
                    } */
                    
                    deferred.resolve(true);
                   
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
                        vm.userProfile.avatar_graphic.values = [0, 102, 102, 24, 24, 102, 102, 0];
                        vm.userProfile.avatar_graphic.colour = "#FF00FF";
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
        function asyncOpenClose() {
            var deferred = $q.defer();
            $timeout(
                function () {
                    if (vm.checkGraphic(vm.userProfile.avatar_graphic.values)) {
                        vm.userProfile.avatar_graphic.values = [0, 102, 102, 24, 24, 102, 102, 0];
                        vm.userProfile.avatar_graphic.colour = "#FF00FF";
                    }
                    var modalParams = [
                        { "allGenres": vm.allGenres },
                        { "userGenres": vm.selectedGenres },
                        { "userProfile": vm.userProfile },
                        {"close":true}
                    ];
                    profileEditModal.open(modalParams, callback, refresh);
                    deferred.resolve();
                },1000
            );

            return deferred.promise;
        }

        vm.checkGraphic = function (gValues) {
            var result = true;
            gValues.forEach(function (row) {
                if (row != 0) {
                    result = false;
                }
            });
            return result;

        };



        function profileEdit() {
            asyncPopulateGenres().then(asyncPopulateProfile).then(asyncLaunchModal).then(function () { vm.genreScrollChecker(); }, function (error) { console.log(error); });
        };
        function profileEdit2() {
            asyncPopulateGenres().then(asyncPopulateProfile).then(asyncOpenClose).then(function () { vm.genreScrollChecker(); }, function (error) { console.log(error); });
        };

        vm.saveGenreEdit = function (newGenres) {
            profileService.asyncSetGenres(newGenres);
        };


        vm.genreScrollChecker = function () {
            vm.displayGenres = vm.userGenres.join(", ");
            if (document.getElementById("genreStatic") && vm.userGenres != null && vm.userGenres != "" && vm.userGenres.length != 0) {
                //console.log("scroll genres",vm.userGenres);
                var genreFont = document.getElementById("genreStatic").style.font;
                var genreText = vm.userGenres.join(", ");
                var maxNoScrollWidth = document.body.clientWidth - (document.getElementsByClassName("profileImageCanvas")[0].offsetWidth);

                if (textWidth(genreText, genreFont) > maxNoScrollWidth) {
                    vm.scrollGenre = true;
                    vm.displayGenres = vm.displayGenres + ", "
                } else {
                    vm.scrollGenre = false;
                }
            }
        };

        vm.nameTextResizer = function () {
            //if text is smaller
            //make it bigger until its max size (36px)?
            //if its bigger
            //make it smaller until it fits

            if (document.getElementById("nameHeader") != null && document.getElementById("nameHeader") != "" && vm.name != null && vm.name != "") {
                var profileNameFont = document.getElementById("nameHeader").style.font;
                var nameText = vm.name;

                var maxNoScrollWidth = document.body.clientWidth - (80);
                //var nameFontSize=document.getElementById("nameHeader").style.fontSize;
                for (var i = 0; i < 36; i++) {
                    //nameFontSize=document.getElementById("nameHeader").style.fontSize;
                    //console.log("testing name at "+i+"px");
                    if (nameTextWidth(nameText, profileNameFont, i + "px") < maxNoScrollWidth) {
                        //console.log(i+"px is smaller");
                    } else {
                        var j = i - 2;
                        //console.log(i+"px is too big, setting name at"+j+"px");
                        document.getElementById("nameHeader").style.fontSize = j + "px";
                        break;
                    }



                    /* if (nameTextWidth(nameText,profileNameFont,nameFontSize)<maxNoScrollWidth) {                //if its smaller
                        document.getElementById("nameHeader").style.fontSize=i+"px";
                        nameFontSize=document.getElementById("nameHeader").style.fontSize;                      //amek bigger
                        if (nameTextWidth(nameText,profileNameFont,nameFontSize)>maxNoScrollWidth) {            //if too big
                            document.getElementById("nameHeader").style.fontSize=(i-1)+"px";                     //revert to 1 smaller and break loop
                            break;
                        }
                    } else{
                        document.getElementById("nameHeader").style.fontSize=i+"px";
                    } */
                }
            }
        };

        function nameTextWidth(text, fontProp, textFontSize) {
            var tag = document.createElement("div");
            tag.style.position = "absolute";
            tag.style.left = "-99in";
            tag.style.whiteSpace = "nowrap";
            tag.style.font = fontProp;
            tag.innerHTML = text;
            tag.style.fontSize = textFontSize;

            document.body.appendChild(tag);

            var result = tag.clientWidth;

            document.body.removeChild(tag);

            return result;
        }

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
                    var colour = result.avatar_graphic.getColour();


                    //if(vm.userProfile.avatar_graphic_colour!="#000000")

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


                    /* if(vm.userProfile.avatar_graphic.colour=="#000000"||vm.userProfile.avatar_graphic.colour==null){
                        document.getElementById("profileImage").style.visibility="hidden";
                    } else{
                        document.getElementById("profileImage").style.visibility="visible";
                    } */



                    //deferred.resolve();
                },
                function fail(error) {
                    // deferred.reject(error);
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
            if (vm.name=="Defaulthony Nameson"||vm.name==null||vm.name=="") {
                profileService.setFirstRunFlag(true);
            }
            vm.setName(profileDetails.name).then(
                vm.setAvatar_image(profileDetails.avatar_image, profileDetails.avatar_image_colour).then(
                    vm.setGenres(profileDetails.genres).then(
                        function onSuccess() {
                            vm.genreScrollChecker()
                            profileService.setModalOpenFlag(false);
                            asyncPopulateProfile();
                            setTimeout(function(){
                                init();
                                console.log("flag",profileService.getFirstRunFlag())
                                if (profileService.getFirstRunFlag()==true) {
                                    profileService.setFirstRunFlag(false);
                                    $ionicSlideBoxDelegate.slide(1);
                                }
                                
                            }, 200);
                            
                        },
                        function fail(error) {
                            spinnerService.spinnerOff();
                        })))

        };
        function refresh() {
            profileService.setModalOpenFlag(false);
            //refresh all the things
            if ((vm.userProfile.avatar_name == null || vm.userProfile.avatar_name == "") && profileService.getOpenModalFlag() == false) {
                profileService.setModalOpenFlag(true);
                vm.profileEdit();
            };
            asyncPopulateProfile();
        };

        vm.setAvatar_image = function (avatar_image, image_colour) {
            //console.log("aimg", avatar_image);
            var avatar_graphic = AvatarGraphic.build(image_colour, avatar_image);
            spinnerService.spinnerOn();
            //profileService.asyncSetAvatarGraphic(avatar_image);
            /* setTimeout(function () { */
            return profileService.asyncSetAvatarGraphic(avatar_graphic).then(
                function success(result) {
                    //console.log("presult",result);
                    vm.userProfile.avatar_graphic = avatar_graphic;
                    /* vm.createProfileGraphic(vm.userProfile.profile_id); */
                    vm.createProfileGraphic(avatar_graphic);
                    spinnerService.spinnerOff();
                },
                function fail(error) {
                    spinnerService.spinnerOff();
                })
            /* }, 0); */
        }


        function createModalList() {
            var firstVariable = "Edit Profile";
            var firstFunc = profileEdit;
            var contextMenu = [];
            contextMenu[0] = gaddumContextMenuItem.build(firstVariable, firstFunc);
            vm.conMenu = contextMenu;
            //console.log(vm.conMenu);
        }

        vm.showQR = function () {
            $ionicModal.fromTemplateUrl('js/directives/profileDirective/showQRCodeModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
                //flag = false;
            }, function (error) {
                //spinnerService.spinnerOff();
                console.log(error);
            });
        };

        // TODO: Error Handling
        vm.profileEdit = profileEdit;
        init();


    }
})();