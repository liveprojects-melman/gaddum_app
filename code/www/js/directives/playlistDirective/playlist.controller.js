(function () {
  'use strict';

  angular
      .module('gaddum.playlistDirective')
      .controller('playlistController', control);

  control.$inject = [
      '$state',
      'profileService',
      'profileEditModal',
      'gaddumContextMenuItem',
      'gaddumShortcutBarService',
      'gaddumMusicProviderService',
      'playlistService',
      '$ionicSlideBoxDelegate',
      'playlistViewModal'
  ];

  function control(
      $state,
      profileService,
      profileEditModal,
      gaddumContextMenuItem,
      gaddumShortcutBarService,
      gaddumMusicProviderService,
      playlistService,
      $ionicSlideBoxDelegate,
      playlistViewModal

  ) {
      var vm = angular.extend(this, {
          scrollGenre:true,
          genresFontStyle:false,
          firstSearch:true,
          playlistsToShow:{}

      });
      var scale = 8;
      vm.userProfile = {
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

      var playlists={
        "playlists": {
          "href": "https://api.spotify.com/v1/search?query=hello&type=playlist&market=GB&offset=0&limit=20",
          "items": [
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/5TkjKcp6CCUsFVxfgzJGqR"
              },
              "href": "https://api.spotify.com/v1/playlists/5TkjKcp6CCUsFVxfgzJGqR",
              "id": "5TkjKcp6CCUsFVxfgzJGqR",
              "images": [
                {
                  "height": null,
                  "url": "https://pl.scdn.co/images/pl/default/f0fd1f95d6a91c40540623ef7a9a2418558e4b91",
                  "width": null
                }
              ],
              "name": "Hello Folks",
              "owner": {
                "display_name": "deep in tune",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/59y39w4lz799s8gp87gyibgz7"
                },
                "href": "https://api.spotify.com/v1/users/59y39w4lz799s8gp87gyibgz7",
                "id": "59y39w4lz799s8gp87gyibgz7",
                "type": "user",
                "uri": "spotify:user:59y39w4lz799s8gp87gyibgz7"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "ODg5LGY4YTE3YWU5NjliYjAxNzcyM2RjMzU3MjQ2ZTJjZTBiYjBiYmE3OTE=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/5TkjKcp6CCUsFVxfgzJGqR/tracks",
                "total": 78
              },
              "type": "playlist",
              "uri": "spotify:playlist:5TkjKcp6CCUsFVxfgzJGqR"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/2NYGt3K1jQouWrpvxtIeJ4"
              },
              "href": "https://api.spotify.com/v1/playlists/2NYGt3K1jQouWrpvxtIeJ4",
              "id": "2NYGt3K1jQouWrpvxtIeJ4",
              "images": [
                {
                  "height": null,
                  "url": "https://pl.scdn.co/images/pl/default/127290d044ff96758dc9025bf6b39214a5bc6265",
                  "width": null
                }
              ],
              "name": "The Menzingers - Hello Exile",
              "owner": {
                "display_name": "themenzingers",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/themenzingers"
                },
                "href": "https://api.spotify.com/v1/users/themenzingers",
                "id": "themenzingers",
                "type": "user",
                "uri": "spotify:user:themenzingers"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NTcsNThmZDljNTU1OTBlZWEzNzBmZGFiNDI4YjYwYTQ1M2E1OGNmMmM5OQ==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/2NYGt3K1jQouWrpvxtIeJ4/tracks",
                "total": 76
              },
              "type": "playlist",
              "uri": "spotify:playlist:2NYGt3K1jQouWrpvxtIeJ4"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/6xwq4yX7Iwcpk8h2BjvKBb"
              },
              "href": "https://api.spotify.com/v1/playlists/6xwq4yX7Iwcpk8h2BjvKBb",
              "id": "6xwq4yX7Iwcpk8h2BjvKBb",
              "images": [
                {
                  "height": null,
                  "url": "https://pl.scdn.co/images/pl/default/60527aee8864b9324819338f68db937dbf3ea68b",
                  "width": null
                }
              ],
              "name": "everything aries",
              "owner": {
                "display_name": "Aries",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/aries_9"
                },
                "href": "https://api.spotify.com/v1/users/aries_9",
                "id": "aries_9",
                "type": "user",
                "uri": "spotify:user:aries_9"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NzQsZGM4MDEyMjk1MTViMTFjYjlhYzE4MjIxYTk2NzU4MjVlNWE3ODBhYw==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/6xwq4yX7Iwcpk8h2BjvKBb/tracks",
                "total": 14
              },
              "type": "playlist",
              "uri": "spotify:playlist:6xwq4yX7Iwcpk8h2BjvKBb"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/37H2aQvD1BqPASB68g6J8Q"
              },
              "href": "https://api.spotify.com/v1/playlists/37H2aQvD1BqPASB68g6J8Q",
              "id": "37H2aQvD1BqPASB68g6J8Q",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/30f6bb99672b3f775380aad175d3361b3048504d749af2bd68fbea282d407cac16c950e1c4df1a3b8bf4b742decec544f70e11b6e20c1aa8c653bae3f33e199602ee80aa5972509586a2c3ed9aea2d27",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/30f6bb99672b3f775380aad175d3361b3048504d749af2bd68fbea282d407cac16c950e1c4df1a3b8bf4b742decec544f70e11b6e20c1aa8c653bae3f33e199602ee80aa5972509586a2c3ed9aea2d27",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/30f6bb99672b3f775380aad175d3361b3048504d749af2bd68fbea282d407cac16c950e1c4df1a3b8bf4b742decec544f70e11b6e20c1aa8c653bae3f33e199602ee80aa5972509586a2c3ed9aea2d27",
                  "width": 60
                }
              ],
              "name": "Hello – OMFG",
              "owner": {
                "display_name": "Jenson Dejesus",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/12124601652"
                },
                "href": "https://api.spotify.com/v1/users/12124601652",
                "id": "12124601652",
                "type": "user",
                "uri": "spotify:user:12124601652"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NTMsMGNhYjQ5NzFiMzc5ZTQwOTQ5OGViYTljNGQwOTZjOTJhNTc3NmVlMA==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/37H2aQvD1BqPASB68g6J8Q/tracks",
                "total": 51
              },
              "type": "playlist",
              "uri": "spotify:playlist:37H2aQvD1BqPASB68g6J8Q"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/7MJULOe1MgkcVsQ3c8jp2Z"
              },
              "href": "https://api.spotify.com/v1/playlists/7MJULOe1MgkcVsQ3c8jp2Z",
              "id": "7MJULOe1MgkcVsQ3c8jp2Z",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/30f6bb99672b3f775380aad175d3361b3048504d749af2bd68fbea282d407cac16c950e1c4df1a3b8bf4b742decec544f70e11b6e20c1aa8c653bae3f33e199602ee80aa5972509586a2c3ed9aea2d27",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/30f6bb99672b3f775380aad175d3361b3048504d749af2bd68fbea282d407cac16c950e1c4df1a3b8bf4b742decec544f70e11b6e20c1aa8c653bae3f33e199602ee80aa5972509586a2c3ed9aea2d27",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/30f6bb99672b3f775380aad175d3361b3048504d749af2bd68fbea282d407cac16c950e1c4df1a3b8bf4b742decec544f70e11b6e20c1aa8c653bae3f33e199602ee80aa5972509586a2c3ed9aea2d27",
                  "width": 60
                }
              ],
              "name": "OMG — Hello",
              "owner": {
                "display_name": "lily60gro",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/lily60gro"
                },
                "href": "https://api.spotify.com/v1/users/lily60gro",
                "id": "lily60gro",
                "type": "user",
                "uri": "spotify:user:lily60gro"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "OSxhNzM2NTFkZmFkOGY3MjgzNmUzNjc5M2QxMWEyOTY5OWIwZjIwOTRh",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/7MJULOe1MgkcVsQ3c8jp2Z/tracks",
                "total": 7
              },
              "type": "playlist",
              "uri": "spotify:playlist:7MJULOe1MgkcVsQ3c8jp2Z"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/37i9dQZF1DZ06evO22y3Bt"
              },
              "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO22y3Bt",
              "id": "37i9dQZF1DZ06evO22y3Bt",
              "images": [
                {
                  "height": null,
                  "url": "https://thisis-images.scdn.co/37i9dQZF1DZ06evO22y3Bt-default.jpg",
                  "width": null
                }
              ],
              "name": "This Is Hello Seahorse!",
              "owner": {
                "display_name": "Spotify",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/spotify"
                },
                "href": "https://api.spotify.com/v1/users/spotify",
                "id": "spotify",
                "type": "user",
                "uri": "spotify:user:spotify"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "MjYwNjc3OTMsMDAwMDAwMDBkZjA0MWE2NDcxNTE5Y2ExMzg0MGVhNzAzOWEzYzRjNA==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO22y3Bt/tracks",
                "total": 47
              },
              "type": "playlist",
              "uri": "spotify:playlist:37i9dQZF1DZ06evO22y3Bt"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/2iBmDZbrWZSjmyspCbyZOW"
              },
              "href": "https://api.spotify.com/v1/playlists/2iBmDZbrWZSjmyspCbyZOW",
              "id": "2iBmDZbrWZSjmyspCbyZOW",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/116f1490cd76d53af12c7464dcf2400796d6f0e0193ab40f6854c40668fbd2e33999fe845207ee9121a1dd1ddd2176dbcd434552b76a5e7a40283529d8b9ac9b0f5813a77f09c7673edf9b17092ecef8",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/116f1490cd76d53af12c7464dcf2400796d6f0e0193ab40f6854c40668fbd2e33999fe845207ee9121a1dd1ddd2176dbcd434552b76a5e7a40283529d8b9ac9b0f5813a77f09c7673edf9b17092ecef8",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/116f1490cd76d53af12c7464dcf2400796d6f0e0193ab40f6854c40668fbd2e33999fe845207ee9121a1dd1ddd2176dbcd434552b76a5e7a40283529d8b9ac9b0f5813a77f09c7673edf9b17092ecef8",
                  "width": 60
                }
              ],
              "name": "hello darkness my old friend",
              "owner": {
                "display_name": "Joses Phang",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/1178143117"
                },
                "href": "https://api.spotify.com/v1/users/1178143117",
                "id": "1178143117",
                "type": "user",
                "uri": "spotify:user:1178143117"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NTUyLDI0MjM1ZDdkYjgwNDkzZWE4NWVlNzYzYTYxNThjMzE3NDQyOTJiOWE=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/2iBmDZbrWZSjmyspCbyZOW/tracks",
                "total": 115
              },
              "type": "playlist",
              "uri": "spotify:playlist:2iBmDZbrWZSjmyspCbyZOW"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/6T7YG9cN4khTVtaG8dQwEf"
              },
              "href": "https://api.spotify.com/v1/playlists/6T7YG9cN4khTVtaG8dQwEf",
              "id": "6T7YG9cN4khTVtaG8dQwEf",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/154cf312a8b0ed2caa1bce108e97e874a83a93b7310c6855095bfde17af6ab5f97c1f3447ff4f2e53aa37254a41cf96e81572524ec523cb870f2bb898f3a47fe150571aeacda7b676be552d8c6df9255",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/154cf312a8b0ed2caa1bce108e97e874a83a93b7310c6855095bfde17af6ab5f97c1f3447ff4f2e53aa37254a41cf96e81572524ec523cb870f2bb898f3a47fe150571aeacda7b676be552d8c6df9255",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/154cf312a8b0ed2caa1bce108e97e874a83a93b7310c6855095bfde17af6ab5f97c1f3447ff4f2e53aa37254a41cf96e81572524ec523cb870f2bb898f3a47fe150571aeacda7b676be552d8c6df9255",
                  "width": 60
                }
              ],
              "name": ".Hello Danger.",
              "owner": {
                "display_name": "Deep Forest Lunar Animals",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/0i5kassl45gvvbvbcx4jsbt3h"
                },
                "href": "https://api.spotify.com/v1/users/0i5kassl45gvvbvbcx4jsbt3h",
                "id": "0i5kassl45gvvbvbcx4jsbt3h",
                "type": "user",
                "uri": "spotify:user:0i5kassl45gvvbvbcx4jsbt3h"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NTEsYzNjODVmNWE5Nzk5OGFjNDM0YTM5NjQ3MmRkZDY0MDI5NGExNTQyMA==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/6T7YG9cN4khTVtaG8dQwEf/tracks",
                "total": 72
              },
              "type": "playlist",
              "uri": "spotify:playlist:6T7YG9cN4khTVtaG8dQwEf"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/0W3c3FVq11uh0eILA8dZF9"
              },
              "href": "https://api.spotify.com/v1/playlists/0W3c3FVq11uh0eILA8dZF9",
              "id": "0W3c3FVq11uh0eILA8dZF9",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/6de953ee694f2d0da11855c0823cd33082644de0",
                  "width": 640
                }
              ],
              "name": "Hello Everybody",
              "owner": {
                "display_name": "paddybarr",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/paddybarr"
                },
                "href": "https://api.spotify.com/v1/users/paddybarr",
                "id": "paddybarr",
                "type": "user",
                "uri": "spotify:user:paddybarr"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NDgsYjUxNDI2M2IzNGUzYTZiNWUyZjhhZmI5ZmRhMThhZDBhZGQ0NmNmZA==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/0W3c3FVq11uh0eILA8dZF9/tracks",
                "total": 47
              },
              "type": "playlist",
              "uri": "spotify:playlist:0W3c3FVq11uh0eILA8dZF9"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/7q6rWrJSha2sLIfFB7CcCc"
              },
              "href": "https://api.spotify.com/v1/playlists/7q6rWrJSha2sLIfFB7CcCc",
              "id": "7q6rWrJSha2sLIfFB7CcCc",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/7d803d8421d8ac9138255419a04a71323b31c9e3c018e59487df998eb8587d312b0b3233fdeff0fcdd6d47cf97786e0117d64214ce365c6d4cbfc347ee45013ffd4e68f43afd8961e919d8c80e54e35e",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/7d803d8421d8ac9138255419a04a71323b31c9e3c018e59487df998eb8587d312b0b3233fdeff0fcdd6d47cf97786e0117d64214ce365c6d4cbfc347ee45013ffd4e68f43afd8961e919d8c80e54e35e",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/7d803d8421d8ac9138255419a04a71323b31c9e3c018e59487df998eb8587d312b0b3233fdeff0fcdd6d47cf97786e0117d64214ce365c6d4cbfc347ee45013ffd4e68f43afd8961e919d8c80e54e35e",
                  "width": 60
                }
              ],
              "name": "Hello – Adele",
              "owner": {
                "display_name": "cocolilokids",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/cocolilokids"
                },
                "href": "https://api.spotify.com/v1/users/cocolilokids",
                "id": "cocolilokids",
                "type": "user",
                "uri": "spotify:user:cocolilokids"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NDAsOTM4NDc5YTZkMDA4ZTZhZjhhY2Q2YzVjNjJlYzgxNjU3OWQ5ZTZjNQ==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/7q6rWrJSha2sLIfFB7CcCc/tracks",
                "total": 36
              },
              "type": "playlist",
              "uri": "spotify:playlist:7q6rWrJSha2sLIfFB7CcCc"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/5BtWTK84nE8gcgEsWbbCfO"
              },
              "href": "https://api.spotify.com/v1/playlists/5BtWTK84nE8gcgEsWbbCfO",
              "id": "5BtWTK84nE8gcgEsWbbCfO",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/8b47495ce0c4a341f7196f70bcf4361e6257c1a09a42b4537c76323687e0a1531e7432169f65ec37c018e59487df998eb8587d312b0b3233fdeff0fcde222a77c131c434afa83ba304b707d4f98bcccb",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/8b47495ce0c4a341f7196f70bcf4361e6257c1a09a42b4537c76323687e0a1531e7432169f65ec37c018e59487df998eb8587d312b0b3233fdeff0fcde222a77c131c434afa83ba304b707d4f98bcccb",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/8b47495ce0c4a341f7196f70bcf4361e6257c1a09a42b4537c76323687e0a1531e7432169f65ec37c018e59487df998eb8587d312b0b3233fdeff0fcde222a77c131c434afa83ba304b707d4f98bcccb",
                  "width": 60
                }
              ],
              "name": "Adele - Hello",
              "owner": {
                "display_name": "robsonrode",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/robsonrode"
                },
                "href": "https://api.spotify.com/v1/users/robsonrode",
                "id": "robsonrode",
                "type": "user",
                "uri": "spotify:user:robsonrode"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "MjYyLGUzMmVjNWE1MmVkNzhlOTY4MWNmM2ZjMDM5Y2JkYzc4N2VkM2I5OTM=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/5BtWTK84nE8gcgEsWbbCfO/tracks",
                "total": 213
              },
              "type": "playlist",
              "uri": "spotify:playlist:5BtWTK84nE8gcgEsWbbCfO"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/3CtTY8WuTk5Yb9KGA2Ozju"
              },
              "href": "https://api.spotify.com/v1/playlists/3CtTY8WuTk5Yb9KGA2Ozju",
              "id": "3CtTY8WuTk5Yb9KGA2Ozju",
              "images": [
                {
                  "height": null,
                  "url": "https://pl.scdn.co/images/pl/default/9bc86399ed6e0ac8a216434e984c8e0bf8bce564",
                  "width": null
                }
              ],
              "name": "HELLO NEIGHBOR RAPS/RAP BATLES",
              "owner": {
                "display_name": "jenava5",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/jenava5"
                },
                "href": "https://api.spotify.com/v1/users/jenava5",
                "id": "jenava5",
                "type": "user",
                "uri": "spotify:user:jenava5"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "MTksMGQ3NDViZTY0N2UzNjEyZWMwOWU2NTRmZjQ5MWE5MGZmZGIxMGUxMg==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/3CtTY8WuTk5Yb9KGA2Ozju/tracks",
                "total": 20
              },
              "type": "playlist",
              "uri": "spotify:playlist:3CtTY8WuTk5Yb9KGA2Ozju"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/6D9lwKuFPd1jS24CjexU3B"
              },
              "href": "https://api.spotify.com/v1/playlists/6D9lwKuFPd1jS24CjexU3B",
              "id": "6D9lwKuFPd1jS24CjexU3B",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/300df154cf1ef0b485a322a038502a70ad0caabd4a2aba076bfc06a8bf19c5fe64ae63cda307c819547f634fb857aa49a8d957b80a7b1160245b20f7d258ab959f1a393da977666663f067a3895b44ec",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/300df154cf1ef0b485a322a038502a70ad0caabd4a2aba076bfc06a8bf19c5fe64ae63cda307c819547f634fb857aa49a8d957b80a7b1160245b20f7d258ab959f1a393da977666663f067a3895b44ec",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/300df154cf1ef0b485a322a038502a70ad0caabd4a2aba076bfc06a8bf19c5fe64ae63cda307c819547f634fb857aa49a8d957b80a7b1160245b20f7d258ab959f1a393da977666663f067a3895b44ec",
                  "width": 60
                }
              ],
              "name": "Kes — Hello",
              "owner": {
                "display_name": "Sheldon Williams",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/12165660811"
                },
                "href": "https://api.spotify.com/v1/users/12165660811",
                "id": "12165660811",
                "type": "user",
                "uri": "spotify:user:12165660811"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "MTU2LGZhMTBkZmIyZmRmMjU2YmZiNGE3OTI4NjNmZmJjZGM0M2I4ODFkZmY=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/6D9lwKuFPd1jS24CjexU3B/tracks",
                "total": 134
              },
              "type": "playlist",
              "uri": "spotify:playlist:6D9lwKuFPd1jS24CjexU3B"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/6dBGJpnOMl2QnBaxzB4YJ5"
              },
              "href": "https://api.spotify.com/v1/playlists/6dBGJpnOMl2QnBaxzB4YJ5",
              "id": "6dBGJpnOMl2QnBaxzB4YJ5",
              "images": [
                {
                  "height": null,
                  "url": "https://pl.scdn.co/images/pl/default/c5146918a7590d42c013b7cf326027b5a9544956",
                  "width": null
                }
              ],
              "name": "Hello Vietnam",
              "owner": {
                "display_name": "Derek Caldana",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/22igu2tg6rqhnzgukfzudgbqq"
                },
                "href": "https://api.spotify.com/v1/users/22igu2tg6rqhnzgukfzudgbqq",
                "id": "22igu2tg6rqhnzgukfzudgbqq",
                "type": "user",
                "uri": "spotify:user:22igu2tg6rqhnzgukfzudgbqq"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "MTM4LDkwN2FhOWExZjljMThmNDU3MzAxMjMyMGVlMTg0NjA3YTYzMWEzYzE=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/6dBGJpnOMl2QnBaxzB4YJ5/tracks",
                "total": 106
              },
              "type": "playlist",
              "uri": "spotify:playlist:6dBGJpnOMl2QnBaxzB4YJ5"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/6u4KuddLp926mEZHqCOQwg"
              },
              "href": "https://api.spotify.com/v1/playlists/6u4KuddLp926mEZHqCOQwg",
              "id": "6u4KuddLp926mEZHqCOQwg",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/8b56d7be709a8d918d8aaef1145a4fc787cfe52a9a2fb97cbb69a911f74ab21fdc0355e5e82aaa9dc10a05cdf8dc9ab6366007c02ebbc25c19a52df8d8b9ac9b0f5813a77f09c7673edf9b17092ecef8",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/8b56d7be709a8d918d8aaef1145a4fc787cfe52a9a2fb97cbb69a911f74ab21fdc0355e5e82aaa9dc10a05cdf8dc9ab6366007c02ebbc25c19a52df8d8b9ac9b0f5813a77f09c7673edf9b17092ecef8",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/8b56d7be709a8d918d8aaef1145a4fc787cfe52a9a2fb97cbb69a911f74ab21fdc0355e5e82aaa9dc10a05cdf8dc9ab6366007c02ebbc25c19a52df8d8b9ac9b0f5813a77f09c7673edf9b17092ecef8",
                  "width": 60
                }
              ],
              "name": "Hello darkness my old friend",
              "owner": {
                "display_name": "Ashleigh Novak",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/1264048373"
                },
                "href": "https://api.spotify.com/v1/users/1264048373",
                "id": "1264048373",
                "type": "user",
                "uri": "spotify:user:1264048373"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NTIyLDhiNDg5N2ZhMDQzNWNmODFmNDExMWFiNDM1YmI4OGI4YjdmYzhmNjY=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/6u4KuddLp926mEZHqCOQwg/tracks",
                "total": 440
              },
              "type": "playlist",
              "uri": "spotify:playlist:6u4KuddLp926mEZHqCOQwg"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/5tWZQTlPYV39ncK8pIz9lB"
              },
              "href": "https://api.spotify.com/v1/playlists/5tWZQTlPYV39ncK8pIz9lB",
              "id": "5tWZQTlPYV39ncK8pIz9lB",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/1f5064b187b9a314c307924a0c3eb23764f22c982e0f038305887060f111668c85fae885fa4496cb9a60ed4162d22cdb7d07ddb182e4183845dd1b1aabc773df172ca13e1e269ff87e7df0d564509ba0",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/1f5064b187b9a314c307924a0c3eb23764f22c982e0f038305887060f111668c85fae885fa4496cb9a60ed4162d22cdb7d07ddb182e4183845dd1b1aabc773df172ca13e1e269ff87e7df0d564509ba0",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/1f5064b187b9a314c307924a0c3eb23764f22c982e0f038305887060f111668c85fae885fa4496cb9a60ed4162d22cdb7d07ddb182e4183845dd1b1aabc773df172ca13e1e269ff87e7df0d564509ba0",
                  "width": 60
                }
              ],
              "name": "Hello lionel ritchie❤️",
              "owner": {
                "display_name": "Åsa Maria Martine Brandebo",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/asa.brandebo"
                },
                "href": "https://api.spotify.com/v1/users/asa.brandebo",
                "id": "asa.brandebo",
                "type": "user",
                "uri": "spotify:user:asa.brandebo"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "MjYsMDBmMjFjNDYyNDVhNjk5ZTA1NzBhNzM1ZTc5ZDhmODc4ZWNhMzc4Mw==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/5tWZQTlPYV39ncK8pIz9lB/tracks",
                "total": 24
              },
              "type": "playlist",
              "uri": "spotify:playlist:5tWZQTlPYV39ncK8pIz9lB"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/1O2GS2avb4WA2UnHra71R9"
              },
              "href": "https://api.spotify.com/v1/playlists/1O2GS2avb4WA2UnHra71R9",
              "id": "1O2GS2avb4WA2UnHra71R9",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/0c171b7701981d40e3bf5f6331283940a77610ee48703d59cc5e093a33b2d53423f607ecb1a9402a4ac8fc14493eddb53f404fe12c6f76d7845f3136ac68a9e4a867ec3ce8249cd90a2d7c73755fb487",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/0c171b7701981d40e3bf5f6331283940a77610ee48703d59cc5e093a33b2d53423f607ecb1a9402a4ac8fc14493eddb53f404fe12c6f76d7845f3136ac68a9e4a867ec3ce8249cd90a2d7c73755fb487",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/0c171b7701981d40e3bf5f6331283940a77610ee48703d59cc5e093a33b2d53423f607ecb1a9402a4ac8fc14493eddb53f404fe12c6f76d7845f3136ac68a9e4a867ec3ce8249cd90a2d7c73755fb487",
                  "width": 60
                }
              ],
              "name": "WOOP WOOP ITS THE SOUND OF THE POLICE #specialswozere",
              "owner": {
                "display_name": "vandaltwo29",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/vandaltwo29"
                },
                "href": "https://api.spotify.com/v1/users/vandaltwo29",
                "id": "vandaltwo29",
                "type": "user",
                "uri": "spotify:user:vandaltwo29"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NDQsNTlkZTk2ZDUwNjI3NTEyMmQyMTllYzAyMTQ2MGY0YzdkOGZjZjFlOQ==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/1O2GS2avb4WA2UnHra71R9/tracks",
                "total": 14
              },
              "type": "playlist",
              "uri": "spotify:playlist:1O2GS2avb4WA2UnHra71R9"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/5ljR2Pt0dBg75Q2s6UL0Rj"
              },
              "href": "https://api.spotify.com/v1/playlists/5ljR2Pt0dBg75Q2s6UL0Rj",
              "id": "5ljR2Pt0dBg75Q2s6UL0Rj",
              "images": [
                {
                  "height": null,
                  "url": "https://pl.scdn.co/images/pl/default/0f9414a287e90d69b9b3bf07f1d80a50afeb7893",
                  "width": null
                }
              ],
              "name": "All Country 🔥🍻",
              "owner": {
                "display_name": "blake.gebke",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/blake.gebke"
                },
                "href": "https://api.spotify.com/v1/users/blake.gebke",
                "id": "blake.gebke",
                "type": "user",
                "uri": "spotify:user:blake.gebke"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "Mzk3LGVmZjIxZGQxNjc3NzgyMDE0Y2QyZDllMWNiYzNiYWYzM2MzMjdlZDA=",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/5ljR2Pt0dBg75Q2s6UL0Rj/tracks",
                "total": 372
              },
              "type": "playlist",
              "uri": "spotify:playlist:5ljR2Pt0dBg75Q2s6UL0Rj"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/1kJF3o4Hqd3JA6G3BC3LEb"
              },
              "href": "https://api.spotify.com/v1/playlists/1kJF3o4Hqd3JA6G3BC3LEb",
              "id": "1kJF3o4Hqd3JA6G3BC3LEb",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/fea7bab7f12fe247d5df5742a7dada672c2464c5",
                  "width": 640
                }
              ],
              "name": "Ludmilla – Hello mundo (Ao vivo)",
              "owner": {
                "display_name": "Isabelly Santos",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/22bhgqdrsfa6mrjaouysa2hfi"
                },
                "href": "https://api.spotify.com/v1/users/22bhgqdrsfa6mrjaouysa2hfi",
                "id": "22bhgqdrsfa6mrjaouysa2hfi",
                "type": "user",
                "uri": "spotify:user:22bhgqdrsfa6mrjaouysa2hfi"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "Myw3OWNhNTEyNWY5ZWMyNTM4MTYzYTVhOGM3M2I2YTRjNjZmYmNhZWU1",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/1kJF3o4Hqd3JA6G3BC3LEb/tracks",
                "total": 25
              },
              "type": "playlist",
              "uri": "spotify:playlist:1kJF3o4Hqd3JA6G3BC3LEb"
            },
            {
              "collaborative": false,
              "external_urls": {
                "spotify": "https://open.spotify.com/playlist/5CAr9JqcGmKtmdJmmyMHA6"
              },
              "href": "https://api.spotify.com/v1/playlists/5CAr9JqcGmKtmdJmmyMHA6",
              "id": "5CAr9JqcGmKtmdJmmyMHA6",
              "images": [
                {
                  "height": 640,
                  "url": "https://mosaic.scdn.co/640/496d40dcbba375ede540bcda898b2d48a354d5838971a383560d1338f058e2c7fedea0f02a4e7047def4030d6ef6587c03e84902f9085d32f5ff5111df3b17e748de56e4ce78ac29b216d3f99afd0c5a",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://mosaic.scdn.co/300/496d40dcbba375ede540bcda898b2d48a354d5838971a383560d1338f058e2c7fedea0f02a4e7047def4030d6ef6587c03e84902f9085d32f5ff5111df3b17e748de56e4ce78ac29b216d3f99afd0c5a",
                  "width": 300
                },
                {
                  "height": 60,
                  "url": "https://mosaic.scdn.co/60/496d40dcbba375ede540bcda898b2d48a354d5838971a383560d1338f058e2c7fedea0f02a4e7047def4030d6ef6587c03e84902f9085d32f5ff5111df3b17e748de56e4ce78ac29b216d3f99afd0c5a",
                  "width": 60
                }
              ],
              "name": "Hello - I Just Came to Say Hello",
              "owner": {
                "display_name": "alicechiessi",
                "external_urls": {
                  "spotify": "https://open.spotify.com/user/alicechiessi"
                },
                "href": "https://api.spotify.com/v1/users/alicechiessi",
                "id": "alicechiessi",
                "type": "user",
                "uri": "spotify:user:alicechiessi"
              },
              "primary_color": null,
              "public": null,
              "snapshot_id": "NDIsYTA2YTljNGRmMTFhNzQxZWIyM2FjNmI4MGY1YWUxNmExNGM0NTNlYw==",
              "tracks": {
                "href": "https://api.spotify.com/v1/playlists/5CAr9JqcGmKtmdJmmyMHA6/tracks",
                "total": 38
              },
              "type": "playlist",
              "uri": "spotify:playlist:5CAr9JqcGmKtmdJmmyMHA6"
            }
          ],
          "limit": 20,
          "next": "https://api.spotify.com/v1/search?query=hello&type=playlist&market=GB&offset=20&limit=20",
          "offset": 0,
          "previous": null,
          "total": 32624
        }
      };

      vm.playlistTracks={
        "items": [
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/2UvstXkR7vu6lBtEabs09N",
                "name": "L.A."
              },
              "href": "https://api.spotify.com/v1/tracks/3t5imuZcw12Aeyj8LH8Qgj",
              "name": "L.A."
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/6C7hulY0uJHWjDwpvxTLFR",
                "name": "The Fixer"
              },
              "href": "https://api.spotify.com/v1/tracks/6SpYE3peZZ7yJvbqI8XZup",
              "name": "Pennies"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/2YYeHjnpTZmvM9ovyN3SU9",
                "name": "Up in Smoke"
              },
              "href": "https://api.spotify.com/v1/tracks/08RvV420oPWfsufT7sC4iJ",
              "name": "Up in Smoke"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/2KAIqR3oe3prlLnThglewH",
                "name": "Old School"
              },
              "href": "https://api.spotify.com/v1/tracks/4lqw0dqDIKasYfIwkLcf0C",
              "name": "Old School"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/0abo1syhjeqggQHbG9tsTA",
                "name": "Rude"
              },
              "href": "https://api.spotify.com/v1/tracks/7esgiCF1WNb6dYvNFMZ1sL",
              "name": "Rude"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/0k2B70dwGYhAwQn09V67C9",
                "name": "Rising Tides"
              },
              "href": "https://api.spotify.com/v1/tracks/4E9yBl1KAw5J0nLZKCXIxF",
              "name": "Rising Tides"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/2RisnGnqdl2KmkWlskYfdt",
                "name": "Fire"
              },
              "href": "https://api.spotify.com/v1/tracks/70VSFe3tTnCLpue9StG69U",
              "name": "Fire"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/3VeNpXAQPUsvF8mvVvQLp6",
                "name": "Constants"
              },
              "href": "https://api.spotify.com/v1/tracks/0qfLBrFQEWfIh9OOKv8hLn",
              "name": "All We Said"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/6Eftj7GXPbzoMlXmwVHnYi",
                "name": "Turning the Shoulder (Live on Windrake Farm)"
              },
              "href": "https://api.spotify.com/v1/tracks/49OAlqD2JoPYhZYVwPqpAU",
              "name": "Turning the Shoulder (Live on Windrake Farm)"
            }
          },
          {
            "added_by": {
              "id": "59y39w4lz799s8gp87gyibgz7"
            },
            "track": {
              "album": {
                "href": "https://api.spotify.com/v1/albums/6Ehc1L1hV3wPX3uHpAOzgm",
                "name": "Four Months"
              },
              "href": "https://api.spotify.com/v1/tracks/5O5yrmtGuLrFjZN7L3n7BQ",
              "name": "Four Months"
            }
          }
        ]
      }
      vm.preventSlideBox = function preventSlideBox() {
        $ionicSlideBoxDelegate.enableSlide(false);
      };
      vm.allowSlideBox = function allowSlideBox(e) {
        $ionicSlideBoxDelegate.enableSlide(true);
      };


      function init() {
          createModalList();
          gaddumShortcutBarService.setContextMenu(vm.conMenu);
          playlistService.asyncSeekPlaylists("").then(function(results){

          vm.playlistsToShow=results;
          });
          //save();

      };
      init();
      function save(){
        playlists.playlists.items.forEach(function(element){
          vm.playlistsToShow.push(element);
        });
      }

      vm.profileEdit= function(){
        //modal
        var allGenres=profileService.getAllGenres();
        var userGenres=profileService.getUserGenres();
        var modalParams=[
            {"allGenres":allGenres},
            {"userGenres":userGenres},
            {"userProfile":profileService.getUserProfile()}
        ];
        profileEditModal.open(modalParams,callback,refresh);
        //var,ok,c

        
        vm.getUserGenres=profileService.getUserGenres().toString();
        vm.genreScrollChecker();
    };



    vm.viewPlaylist= function(PlaylistToGet){
        //modal
        //var viewedPlaylist=playlistService.getPlaylist(PlaylistToGet);
        console.log("p2g",PlaylistToGet);;
        var viewedPlaylist=playlists.playlists.items[PlaylistToGet];
        var modalParams=
            {"playlist":viewedPlaylist,"name":playlists.playlists.items[PlaylistToGet].name,"tracks":vm.playlistTracks}
           /*  {"userGenres":userGenres},
            {"userProfile":profileService.getUserProfile()} */
        ;
        playlistViewModal.open(modalParams,deletePlaylist,refresh);
        //var,ok,c
    };

    function deletePlaylist(){
        //playlistService.deletePlaylist(playlistToDelete)
        console.log("delete");
    };

    function refresh(){
        console.log("refresh");
    };





    vm.preventSlideBox = function preventSlideBox() {
        $ionicSlideBoxDelegate.enableSlide(false);
      };
      vm.allowSlideBox = function allowSlideBox(e) {
        $ionicSlideBoxDelegate.enableSlide(true);
      };



      function createModalList() {
            var firstVariable = "Edit Profile";
            var firstFunc = vm.profileEdit; 
            var contextMenu = [];
            contextMenu[0]=gaddumContextMenuItem.build(firstVariable,firstFunc);
            vm.conMenu = contextMenu;
            console.log(vm.conMenu);
        };
        function getPlaylist(){

          gaddumMusicProviderService.importAllPlaylists().then(function(result){
              var id=result.data.items[0].id
              
                gaddumMusicProviderService.getplaylistTracks(id).then(function(result2){

                    console.log("track",result2);
                }).catch(function(er){

                    console.log(er);
                });
            }).catch(function(er){

                console.log(er);
            });


        };

        vm.searchColour=function(){
          document.getElementById('searchPlaylistsBox').style.color="grey";
        };

        vm.searchClick=function(){
          if (vm.firstSearch) {
            document.getElementById('searchPlaylistsBox').value="";
            document.getElementById('searchPlaylistsBox').style.color="black";
            console.log("clicked");
            vm.firstSearch=false;
        };

        vm.searchDeselect=function(){
          if (document.getElementById('searchPlaylistsBox').value=="") {
              document.getElementById('searchPlaylistsBox').value="search";
              document.getElementById('searchPlaylistsBox').style.color="grey";
              vm.firstSearch=true;
              console.log("reactivated");
            }

            };
        };
        
        vm.searchPlaylists=function(){
          console.log("true Origional",playlists);
          console.log("origional",vm.savep);
          console.log("copy",vm.playlistsToShow.playlists);
          var searchTerm=document.getElementById("searchPlaylistsBox").value;
          var tempArray=[];
          //vm.playlistsToShow=playlists;
          playlists.playlists.items.forEach(function(playlist) {
            //console.log(playlist.name,searchTerm);
            if (playlist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              console.log("pushing"+playlist.name);
              tempArray.push(playlist);
            }
          });
          vm.playlistsToShow=tempArray;
        //console.log(vm.playlistsToShow.playlists.items);
        };
        
  }
})();