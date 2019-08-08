// as per https://trello.com/c/tWfwgXbh/7-musicproviderservice
(function () {
  'use strict';

  angular
    .module('gaddum.streaming')
    .factory('gaddumMusicProviderService', gaddumMusicProviderService);

  gaddumMusicProviderService.$inject = [
    '$http',
    '$injector',
    '$timeout',
    '$q',
    'dataApiService',
    'MusicProviderIdentifier'
  ];

  function gaddumMusicProviderService(
    $http,
    $injector,
    $timeout,
    $q,
    dataApiService,
    MusicProviderIdentifier

  ) {

    function onLoginNotNeeded() {
      var deferred = $q.defer();
      $timeout(
        function () {
          deferred.resolve();
        }
      );
      return deferred.promise;
    }


    function asyncPromptIfLoginNeeded(loggedIn) {
      if (loggedIn) {
        return onLoginNotNeeded();
      } else {
        return service.returnsALoginPromise();
      }
    }

    // will force a login if one is required
    function asyncCheckForLoginPromptIfNeeded() {
      return asyncIsLoggedIn().then(asyncPromptIfLoginNeeded)
    }


    function asyncGetSupportedServiceProviders() {
      var deferred = $q.defer();


      dataApiService.getSupportedMusicProviders().then(
        function onSuccess(items){
          var results = [];
          if(items && items.length > 0){

            items.forEach(function(item){
              results.push(MusicProviderIdentifier.buildFromObject(item));
            });

          deferred.resolve(results);
          }else{
            deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "no music providers found!"));
          }
        },
        function onFail(error){
          deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "error looking for music providers: " + error.message));
        }
      );

      $timeout(


        function () {
          deferred.resolve(buildMusicProviders());
        }
      );
      return deferred.promise;
    }

    function asyncGetSupportedSearchModifier() {
      return $q(function (resolve, reject) {
        service.musicProvider.asyncGetSupportedSearchModifier().then(function (result) {
          return resolve(result);
        });
      });
    }

    function asyncSetServiceProvider(musicProviderIdentifier) {
      // dynamic injection: see http://next.plnkr.co/edit/iVblEU?p=preview&utm_source=legacy&utm_medium=worker&utm_campaign=next&preview, https://stackoverflow.com/questions/13724832/angularjs-runtime-dependency-injection
      service.musicProvider = $injector.get(musicProviderIdentifier.getId());
      return service.musicProvider.asyncInit(musicProviderIdentifier);
    }



    function asyncLogin() {
      var promise = null;

      if (service.musicProvider) {
        promise = service.musicProvider.asyncLogin();
      } else {
        var deferred = $q.defer();
        promise = deferred.promise;
        deferred.reject(ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "call setSupportedServiceProvider before attempting to login."));
      }
      return promise;

    }

    function asyncIsLoggedIn() {
      var promise = null;

      if (service.musicProvider) {
        promise = service.musicProvider.asyncIsLoggedIn();
      } else {

        var deferred = $q.defer();
        promise = deferred.promise;
        $timeout(function () {
          deferred.resolve(false);
        });

      }
      return promise;
    }

    function asyncLogout() {

      var promise = null;

      if (service.musicProvider) {
        promise = service.musicProvider.asyncLogout();
      } else {
        var deferred = $q.defer();
        promise = deferred.promise;
        deferred.resolve();
      }
      return promise;
    }

    function asyncSeekTracks(searchTerm, trackSearchCriteria, limit, page) {
      return asyncCheckForLoginPromptIfNeeded().then(
        function () {
          return service.musicProvider.asyncSeekTracks(searchTerm, trackSearchCriteria, limit, page);
        });
    }

    function asyncSetTrack(genericTrack) {
      return asyncCheckForLoginPromptIfNeeded().then(
        function () {
          return service.musicProvider.asyncSetTrack(genericTrack);
        });
    }

    function asyncPlayCurrentTrack() {
      return asyncCheckForLoginPromptIfNeeded().then(service.musicProvider.asyncPlayCurrentTrack);
    }

    function asyncPauseCurrentTrack() {
      return asyncCheckForLoginPromptIfNeeded().then(service.musicProvider.asyncPauseCurrentTrack);
    }

    function asyncGetProfilePlaylist(offset, limit) {
      return asyncCheckForLoginPromptIfNeeded().then(function () {
        return service.musicProvider.asyncGetProfilePlaylist(offset, limit);
      });
    }

    function asyncImportPlaylists(playlists) {
      return asyncCheckForLoginPromptIfNeeded().then(function () {
        return service.musicProvider.asyncImportPlaylists(playlists);
      });
    }

    function asyncImportTracks(tracks) {
      return service.musicProvider.asyncImportTracks(tracks);
    }

    function asyncGetTrackInfo(genericTrack) {
      return asyncCheckForLoginPromptIfNeeded().then(
        function () {
          return service.musicProvider.asyncGetTrackInfo(genericTrack);
        });
    }


    function asyncGetSupportedGenres() {
      return asyncCheckForLoginPromptIfNeeded().then(
        function () {
          return service.musicProvider.asyncGetSupportedGenres();
        });
    }

    function asyncSetGenres(genres) {
      return asyncCheckForLoginPromptIfNeeded().then(
        function () {
          return service.musicProvider.asyncSetGenres(genres);
        });
    }

    function asyncGetGenres() {
      return asyncCheckForLoginPromptIfNeeded().then(
        function () {
          return service.musicProvider.asyncGetGenres();
        });
    }

    function initialise(returnsALoginPromise) {
      console.log("gaddum.musicProvider.service.js:initialise() invoked");
      if (returnsALoginPromise) {
        service.returnsALoginPromise = returnsALoginPromise;
      } else {
        throw (ErrorIdentifier.build(ErrorIdentifier.SYSTEM, "Music Provider Service needs a function returning a promise which will handle the update of its access credentials, calling MusicProviderService.asyncLogin()"))
      }
    };

    var service = {
      // vars
      musicProvider: undefined,
      asyncLoginResource: null,

      // funcs
      initialise: initialise,
      asyncGetSupportedServiceProviders: asyncGetSupportedServiceProviders,
      asyncSetServiceProvider: asyncSetServiceProvider,
      asyncLogin: asyncLogin,
      asyncIsLoggedIn: asyncIsLoggedIn,
      asyncLogout: asyncLogout,
      asyncSeekTracks: asyncSeekTracks,
      asyncSetTrack: asyncSetTrack,
      asyncPlayCurrentTrack: asyncPlayCurrentTrack,
      asyncPauseCurrentTrack: asyncPauseCurrentTrack,
      asyncImportPlaylists: asyncImportPlaylists,
      asyncGetTrackInfo: asyncGetTrackInfo,
      asyncGetSupportedGenres: asyncGetSupportedGenres,
      asyncSetGenres: asyncSetGenres,
      asyncGetGenres: asyncGetGenres,
      asyncGetSupportedSearchModifier: asyncGetSupportedSearchModifier,
      asyncGetProfilePlaylist: asyncGetProfilePlaylist,
      asyncImportTracks:asyncImportTracks

      /*,

      state: {
        ready: false,
        playing: false
      },
      song: {
        title: "THIS IS A TITLE",
        artist: "THIS IS AN ARTIST"
      }*/
    };





    return service;

  }

})();
