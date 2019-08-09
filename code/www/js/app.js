// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var startState = 'gaddum.profile';

angular.module('gaddum', [
  'ionic',
  'momentjs',
  'app.startup',
  'ngTouch',
  'utilitiesjs',
  'dataapijs',
  'app.db',
  'gaddum.models',
  'gaddum.player',
  'gaddum.playermenu',
  'gaddum.streaming',
  'gaddum.main_ui',
  'gaddum.profile',
  'gaddum.groups',
  'gaddum.friends',
  'gaddum.messages',
  'gaddum.playlists',
  'gaddum.gifts',
  'gaddum.browse',
  'gaddum.mood',
  //  'gaddum.mood.switch'
  'gaddum.login',
  'gaddum.selector',
  'modalsProfile',
  'gaddum.profileDirective',
  'gaddum.settings',
  'gaddum.permissions',
  'gaddum.shortcutBar',
  'editImageModalModule',
  'genresCheckboxModalsModule',
  'gaddum.searchCat',
  'gaddum.userprofiler',
  'gaddum.alert',
  'playlistViewModule',
  'playlistEditModule',
  'gaddum.playlistDirective'

])
  .run([
    '$ionicPlatform',
    '$state',
    '$rootScope',
    '$ionicSlideBoxDelegate',
    '$window',
    '$q',
    'startupSrvc',
    'loginModal',
    'gaddumMusicProviderService',
    'permissionsService',
    'permissionsListenerService',
    function (
      $ionicPlatform,
      $state,
      $rootScope,
      $ionicSlideBoxDelegate,
      $window,
      $q,
      startupSrvc,
      loginModal,
      gaddumMusicProviderService,
      permissionsService,
      permissionsListenerService) {

      $rootScope.$on('slideChanged', function (a) {
        var stateToGoTo = "gaddum." + $($("#main_wrapper").find("ion-slide")[parseInt($ionicSlideBoxDelegate.currentIndex())]).data("state");
        $state.transitionTo(stateToGoTo, {}, { notify: true }); // notify seems to overwrite the views
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        // update the slider delegate - is there a matching slide name?
        //     console.log("stateChangeStart", toState);

        if (toState.name != "startup_permissions" && toState.name != "startup_frontpage") {
          var baseStateName = toState.name.split(".")[1];
          if (angular.isDefined(baseStateName) === true) {
            var sliderState = false;
            $($("#main_wrapper").find("ion-slide")).each(function (i) {
              if ($($("#main_wrapper").find("ion-slide")[i]).data("state") === baseStateName) {
                // these *is* a matching slide for this state change
                $ionicSlideBoxDelegate.slide(i);
                $rootScope.currentSlide = i;
                $rootScope.totalSlides = $('#main_wrapper').find("ion-slide").length;

                $state.go("gaddum." + baseStateName, {}, { reload: true, notify: false });
              }
            });
          }
        }
      });

      $rootScope.$on('$stateChangeError', function (err, toState, toParams, fromState, fromParams) {
        console.log('⚠️$stateChangeError!! ' + toState.to + '- : \n', err, toState, toParams);
      });

      $ionicPlatform.ready(function () {

        //['$state','$statusBar','$window',function ($state,$statusBar,$window) {
        if ($window.cordova && $window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if ($window.StatusBar) {
          StatusBar.styleDefault();
        }







        function asyncStart() {
          var deferred = $q.defer();

          startupSrvc.asyncInitialise().then(
            function () {
              gaddumMusicProviderService.asyncInitialise(loginModal.promiseLogin).then(
                function(){
                  permissionsListenerService.initialise(null);
                  $state.go('gaddum.profile');
                  deferred.resolve();
                },
                deferred.reject
              );
            },
            deferred.reject
          )

          return deferred.promise;
        }


        
        permissionsService.returnPermissions().then(
          function (response) {
            if (response.hasAllRequiredPermissions) {
              asyncStart();
            } else {
              // The main page contains a directive which automatically 
              // pops up when permissions are needed we listen for its completion here.
              // we defer starting until this has completed
              permissionsListenerService.initialise(
                function onPermissionsGranted() {
                  asyncStart();
                });
            }
          }
        );

      }/*]*/);

    }]);
