app.controller('playlistCtrl', function($rootScope, $scope, $stateParams, ytService, selectedFactory) {
  $scope.playerPlaylist = $stateParams.playlistParam;
  function playlistPrep(list, privateParam) {
    /*TODO: this function attaches an src href to eac video, and also, if the user is not registered,
    hide the private videos*/
      for (var i=0;i<list.length;i++) {
        if (list[i].snippet.title==="Private video") {
          list.splice(i,1);
          i--;
        } else {
        list[i].playurl = "https://www.youtube.com/embed/"+list[i].contentDetails.videoId;
        // $sce.trustAsHtml(list[i].playurl);
        // console.log("current playlist src is", list[i].playurl);
      }
      //  TODO: use this in the page that plays a single video:
      // else if (playlistType==="video") {
      //   console.log("video playlist looks like", playlist);
      //   playlist[i].playurl = "https://www.youtube.com/embed/"+playlist[i].id.videoId;
      // }//else is a video
      }//for
  }//plPrep
  function initPlayer() {
    console.log("state params are now", $stateParams);
    // if ($stateParams.playlistParam) {
    //   $scope.playerPlaylist = $stateParams.playlistParam;
    //   selectedFactory.setPlaylist($scope.playPlaylist);
    //   // console.log("rootscope saved ", $rootScope.selectedPlaylist);
    // } else {
    //   console.log("playlist after back up: "$scope.playerPlaylist);
    //   // console.log("rootscope loaded ", $rootScope.selectedPlaylist);
    // } // else we came back here and we're assuming that there actually was a playlist
    ytService.getPlaylistVideos($stateParams.id).then(function(res, err) {
      if (err) {
        console.error(err);
      } else {
        $scope.playlistItems = res.items;
        console.log("playlist item response is", $scope.playlistItems);
        playlistPrep($scope.playlistItems, "guest");
      }//else
    })//callback
  }//initPlayer
  initPlayer();
  console.log("selected playlist is ", $scope.playerPlaylist);
});
