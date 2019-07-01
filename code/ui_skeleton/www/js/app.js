// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('gaddum', [
  'ionic',
  'ngTouch',
  'gaddum.player',
  'gaddum.playermenu',
  'gaddum.main_ui',
  'gaddum.profile',
  'gaddum.groups',
  'gaddum.friends',
  'gaddum.messages',
  'gaddum.playlists',
  'gaddum.gifts',
  'gaddum.browse',
  'gaddum.mood'
])
  .run(function ($ionicPlatform, $state, $rootScope, $ionicSlideBoxDelegate) {
    $rootScope.$on('slideChanged', function(a) {
      console.log("slideChanged - ",a);
      console.log("  slide now ",$ionicSlideBoxDelegate.currentIndex());
      var stateToGoTo = "gaddum." + $($("#main_wrapper").find("ion-slide")[parseInt($ionicSlideBoxDelegate.currentIndex())]).data("state");
      console.log("-- going to state: ", stateToGoTo);
      $state.transitionTo( stateToGoTo  ,{},{notify:true}); // notify seems to overwrite the views
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
      // update the slider delegate - is there a matching slide name?
      var baseStateName = toState.name.split(".")[1];
      if(angular.isDefined(baseStateName)===true) {
        console.log("LOOKING FOR A SLIDE CALLED "+baseStateName);
        var sliderState = false;
        $($("#main_wrapper").find("ion-slide")).each(function(i){
          if( $($("#main_wrapper").find("ion-slide")[i]).data("state") === baseStateName ) {
            console.log(" -- found it, "+String(i));
            // these *is* a matching slide for this state change
            $ionicSlideBoxDelegate.slide(i);
            console.log("^^^ found - sliding to slide number "+String(i)+", "+baseStateName);
            //event.preventDefault();
            return true;
          }
        });
      }
//      return false;
    });

    $rootScope.$on('$stateChangeError', function (err, toState, toParams, fromState, fromParams) {
      console.log('⚠️$stateChangeError!! ' + toState.to + '- : \n', err, toState, toParams);
    });
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      // ADDED START0
      $state.go("gaddum");//.then(function(){$state.go("playlists")});
      // ADDED END

    });
  });
