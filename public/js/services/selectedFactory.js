app.factory('selectedFactory', [ '$http', function($http) {
  var selectedVideo = {};
  var selectedPlaylist = {};
  function getPlaylist() {
    return selectedPlaylist;
  };//getVideo
  function getVideo() {
    return selectedVideo;
  };//getVideo
  function setVideo(video) {
    selectedVideo = video;
  };//setVideo
  function setPlaylist(playlist) {
    selectedPlaylist = playlist;
  };//setPlaylist
  return {
    setVideo: setVideo,
    setPlaylist: setPlaylist,
    getVideo: getVideo,
    getPlaylist: getPlaylist
  };
}]);
