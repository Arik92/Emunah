app.controller('sabbathCtrl', function($scope, $state, authFactory, hebService) {
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
              $scope.showResult = true;
              $scope.candleTimes = sab.items[0].title;
              console.log("sabbath ", sab);
            }//else
          }) //hebCal cb
        }// else lat exists
      });//tz cb
      //TODO make api call to hebcal to get sabbath times

    } else {
		alert("Please choose your location");
    }
  }//checkTimes
}); //controller