app.service('ytService', function($http) {
  var serv= {};
  // data-channel-external-id="UCtAh700VTIQb5Wsx_vdg-Pw"
  var key = 'AIzaSyCLT_rwCcNUqfBEU0FRm2hoBhMkReIUFJU';
  serv.getAllPlayLists = function() {
    var part = "snippet";
    var id = "UCtAh700VTIQb5Wsx_vdg-Pw";
    return $http.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=6&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&key='+key).then(function(response){
      return response.data;
    } ,function(error) {
      console.error("error during api request", error);
    });
  }//getAllPlaylists
  serv.getLatestVids = function(num) {
    return $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCtAh700VTIQb5Wsx_vdg-Pw&maxResults='+num+'&order=date&type=video&key='+key).then(function(response) {
      //console.log('latest response', response);
      return response.data;
    }, function(error) {
      console.error("error fetching laest vids");
    });

  }//getLatesVids
  return serv;
})//service
