app.service('ytService', function($http) {
  var serv= {};
  var config = require('../config.js');

  // function getYouTubeKey() {
  //   var key = $http.get('/key').then(function(response){}, function(error) {
  //     console.error("error retreiving")
  //   })
  // }//ge
  serv.getAllPlayLists = function() {
    var part = "snippet";
    var id = "UCtAh700VTIQb5Wsx_vdg-Pw";
    return $http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&key=' + config.YOUTUBE_KEY).then(function(response){
      console.log("response is", response);
      return response.data;
    } ,function(error) {
      console.error("error during api request", error);
    });
  }//getAllPlaylists
  serv.getNextPlayLists = function(Token) {
    return $http.get('https://www.googleapis.com/youtube/v3/playlists?pageToken='+Token+'&part=snippet&maxResults=48&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&key=' + config.YOUTUBE_KEY).then(function(response){
      console.log("next playlists are:", response.data);
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
  return serv;
})//service

