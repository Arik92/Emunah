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
