(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = {
  YOUTUBE_KEY: 'AIzaSyDGjaIizr-JLOczz8ass2zppBkb3MG5zRk',
  TWILIO_Sid: 'AC2fe63f19ef46f1b80f8b38ad6121f610',
  TWILIO_Token: 'a3b2631571cb7450c5b60dbe7dcc2af2',
  MAPS_API_KEY: 'AIzaSyBlqLa-v1ZicvzAhvzPyX4p0mbXIzYjGEk',
  TIMEZONES_KEY: 'AIzaSyAgo8-bhq12xbOnniQTtz_F0RqU2mqZuuY'
};
module.exports = config;
},{}],2:[function(require,module,exports){
app.controller('sabbathCtrl', ['$scope', '$state', 'authFactory', 'hebService', function($scope, $state, authFactory, hebService) {
  //console.log("auth user data to work with", authFactory.currentUser);
  $scope.havdala = 50;
  var config = require('../config.js');
$scope.mapKey = config.MAPS_API_KEY;
var timeKey = config.TIMEZONES_KEY;
//console.log("key is: ", $scope.mapKey);
/////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
var placeSearch, autocomplete;
function initAutocomplete(){
// Create the autocomplete object, restricting the search to geographical
// location types.
autocomplete = new google.maps.places.Autocomplete(
  /** @type {!HTMLInputElement} */
  (document.getElementById('autocomplete')), {
    types: ['geocode']
  });
console.log('autocomplete is', autocomplete)
// console.log('autocomplete', autocomplete);
autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress() {
// Get the place details from the autocomplete object.
$scope.selectedPlace = autocomplete.getPlace();
console.log('place is', $scope.selectedPlace);
$scope.selectedLat = $scope.selectedPlace.geometry.location.lat(); // NOTE: setting current lattitude/longitude for distance calculation
$scope.selectedLng = $scope.selectedPlace.geometry.location.lng();
$scope.timeStamp = Date.now()/1000;
console.log('place lat is', $scope.selectedLat);
console.log('place langtitude is', $scope.selectedLng);
} //fillInAdress

$scope.getDistanceFromLatLonInKm = function(lat1, lon1, lat2, lon2) {
var R = 6371; // Radius of the earth in km
var dLat = deg2rad(lat2 - lat1); // deg2rad below
var dLon = deg2rad(lon2 - lon1);
var a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
var d = R * c; // Distance in km
return d;
}

function deg2rad(deg) {
return deg * (Math.PI / 180)
}

function addScript( src ) {
var tag = document.getElementById("maptag");
  if (!tag)  {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  s.setAttribute('id', "maptag");
  document.body.appendChild( s );
  console.log("adding tag for first time in the run");
  s.onload = initAutocomplete;
} else {
  console.log("tag alredy added");
  initAutocomplete();
}//else
  // when the script has finished loading, only THEN call autocomplete()
}//addScript

//calling the addScript function
var mapSrc = "https://maps.googleapis.com/maps/api/js?key="+$scope.mapKey+"&libraries=places&language=en";
addScript(mapSrc);

///////////////////////////////////////// google maps interface
  $scope.useOwnLocation = function() {
  navigator.geolocation.getCurrentPosition(function(success){
    console.log("success", success);
    $scope.selectedLat = success.coords.latitude;
    $scope.selectedLng = success.coords.longitude;
    $scope.timeStamp = success.timestamp/1000;
    // hebService.getSabbath(latLng).then(function(data, err) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log("sabbath data");
    //   }//else
    // })//hebService cb
  });
}//useOwnLocation
  // hebService.getCurrentHebDate();
  // $rootScope.currentUser = authFactory.currentUser.email;
  $scope.checkTimes = function() {
	  if (!$scope.showResult) {
    if ($scope.selectedLat) {
      var tzRequestString = "https://maps.googleapis.com/maps/api/timezone/json?location="+$scope.selectedLat+","+$scope.selectedLng+"&timestamp="+$scope.timeStamp+"&language=en&key="+timeKey;
      console.log("tzRequestString", tzRequestString);
      hebService.getLocationTz(tzRequestString).then(function(result, err){
        if (err) {
          console.error(err);
        } else {
          var tz = result.timeZoneId;
          console.log("tz is ", tz);

          hebService.getSabbath($scope.selectedLat, $scope.selectedLng, tz, $scope.havdala).then(function(sab, error){
            if (error) {
              console.log(error);
            } else {
				//TODO: make error handler for: no candle light, couldnt find time zone, etc'
              $scope.showResult = true;
			  $scope.candleTimes = "";
			  //NOTE might need to check if its a saturday
			  for (var i=0;i<sab.items.length;i++) {
				  if (sab.items[i].category==="candles") {
					  $scope.candleTimes = sab.items[i].title;
				  }//if found candle times 
			  }//for 
              console.log("candles?", $scope.candleTimes);
              console.log("sabbath ", sab);
            }//else
          }) //hebCal cb
        }// else lat exists
      });//tz cb
      //TODO make api call to hebcal to get sabbath times

    } else {
		alert("Please choose your location");
    }
	  } else {
		  $scope.showResult = false;
		  //TODO reset google autocompete
		  $scope.selectedLat = null;
		  $scope.selectedLng = null;
		  $scope.selectedPlace = null;
		  $scope.gLoc = "";
	  }//else reset show Result
  }//checkTimes
}]); //controller
},{"../config.js":1}],3:[function(require,module,exports){
app.service('ytService', ['$http', function($http) {
  var serv= {};
  var config = require('../config.js');

  serv.getAllPlayLists = function() {
    var part = "snippet";
    var id = "UCtAh700VTIQb5Wsx_vdg-Pw";
    return $http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&key=' + config.YOUTUBE_KEY).then(function(response){
      //console.log("response is", response);
      return response.data;
    } ,function(error) {
      console.error("error during api request", error);
    });
  }//getAllPlaylists
  serv.getNextPlayLists = function(Token) {
    return $http.get('https://www.googleapis.com/youtube/v3/playlists?pageToken='+Token+'&part=snippet&maxResults=48&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&key=' + config.YOUTUBE_KEY).then(function(response){
      //console.log("next playlists are:", response.data);
      return response.data;
    }, function(error){
      console.error("error fetching the next playlists");
     });
  }
  serv.getLatestVids = function(num) {
    return $http.get('https://www.googleapis.com/youtube/v3/search?&part=snippet&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&maxResults='+num+'&order=date&type=video&key=' + config.YOUTUBE_KEY).then(function(response) {
      //console.log('latest response', response);
      return response.data;
    }, function(error) {
      console.error("error fetching latest vids");
    });
  }//getLatesVids
  serv.getVideo = function(id) {
    return $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+id+'&key=' + config.YOUTUBE_KEY).then(function(response) {
      console.log('found video response', response);
      return response.data.items[0];
    }, function(error) {
      console.error("error fetching specific vid");
    });
  }//getLatesVids
  serv.getPlaylistVideos = function(playlistId) {
    return $http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId='+playlistId+'&key='+config.YOUTUBE_KEY)
    .then(function(response) {
      return response.data;
    },function(err) {
      console.error("error fetching playlist item");
    })
  }//getPlaylistVideos
  serv.getPlaylistsByQuery = function(query) {
	  var id = "UCtAh700VTIQb5Wsx_vdg-Pw";
	return $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=23&channelId='+id+'&type=playlist&q='+query+'&key='+config.YOUTUBE_KEY).then(function(response){
	return response.data;	
	}, function(err){
		console.error("error while searching for "+query+" playlists");
	});  
  }
  serv.getPageQueryPlaylists = function(query, token) {
	  var id = "UCtAh700VTIQb5Wsx_vdg-Pw";
	return $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=23&pageToken='+token+'&channelId='+id+'&type=playlist&q='+query+'&key='+config.YOUTUBE_KEY).then(function(response){
	return response.data;	
	}, function(err){
		console.error("error while searching for "+query+" playlists");
	});  
  }
  return serv;
}])//service

},{"../config.js":1}]},{},[2,3]);
