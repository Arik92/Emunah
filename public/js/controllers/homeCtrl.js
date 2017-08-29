app.controller('homeCtrl', function($rootScope, $scope, authFactory, ytService) {
  console.log("auth user data to work with", authFactory.currentUser);
  $rootScope.currentUser = authFactory.currentUser.email;
  ////////****************************LATEST VIDEO INTERFACE ******************************8/////////////////////
  $scope.getLatestVids = function(num) {
  ytService.getLatestVids(num).then(function(data, err){
    if (err) {
      console.error("controller error fetching latest videos", err);
    } else {
      $scope.latestVids = data.items;
      console.log("latest vids are", data.items);
      $scope.attachSource($scope.latestVids, "video");
    }//else
  })//callback
};//get latest videos
////////****************************LATEST VIDEO INTERFACE ******************************8/////////////////////

////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
$scope.getAllPlayLists = function() {
  ytService.getAllPlayLists().then(function(data, err){
    if (err) {
      console.error("controller error fetching playlists");
    } else {
      $scope.allPlayLists = playlistFilter(data.items); // an array of 48 playLists
      console.log("after filter", $scope.allPlayLists);
      $scope.playListIndex = 0;
      $scope.numRes = data.pageInfo.totalResults;
      $scope.currentPlaylists = [];
      $scope.updatePlaylistForward();
      $scope.nextToken = data.nextPageToken;
    }//else
  });//callback
}//getAllPlaylists
$scope.attachSource = function(playlist, playlistType) {
  for (var i=0;i<playlist.length;i++) {
    if (playlistType==="playlist") {
    playlist[i].playurl = "https://www.youtube.com/embed?listType=playlist&list="+playlist[i].id;
    console.log("current playlist src is", playlist[i].playurl);
  } else if (playlistType==="video") {
    console.log("video playlist looks like", playlist);
    playlist[i].playurl = "https://www.youtube.com/embed/"+playlist[i].id.videoId;
  }//else is a video
  }//for
}//attactch source
function playlistFilter(playlist) {
  for (var i=0;i<playlist.length;i++) {
    if (playlist[i].snippet.thumbnails.medium.url==="http://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg") {
      playlist.splice(i, 1);
      i--;
    }//if found an irrelevent playlist
  }//for loop

    return playlist;
}//playListFilter
$scope.getNextPlayLists = function() {
  ytService.getNextPlayLists($scope.nextToken).then(function(data, err){
    if (err) {
      console.log("controller error fetching next playlists");
    } else {
      for (var i = 0;i<data.items.length;i++) {
          $scope.allPlayLists.push(data.items[i]);
      }//for
      $scope.allPlayLists = playlistFilter($scope.allPlayLists);
      console.log("array after fetch loop", $scope.allPlayLists);
      $scope.prevToken = data.prevPageToken;
      var count = 0;
    $scope.currentPlaylists = [];
    for (var i = $scope.playListIndex;i<$scope.playListIndex+6;i++) {
      // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
      $scope.currentPlaylists[count] = $scope.allPlayLists[i];
      count++;
    }//for update playlist
    $scope.playListIndex+=6;
    console.log("playlist index is now", $scope.playListIndex);
    }//else
  })
}//fetch next playlists

$scope.getPrevPlayLists = function() {
  ytService.getNextPlayLists($scope.prevToken).then(function(data, err){
    if (err) {
      console.log("controller error fetching next playlists");
    } else {
      $scope.currentPlaylists = data.items;
      $scope.nextToken = data.nextPageToken;
    }//else
  })
}//fetch prev playlists

$scope.updatePlaylistForward = function() {
  var max;
  var diff = $scope.allPlayLists.length-$scope.playListIndex;
  if ((diff<=5)&&($scope.playListIndex+diff<$scope.numRes)) {
    $scope.getNextPlayLists();
  } else {
    if (diff<=5) {
      max = diff;  //if we reached here, these are the last 5 or less results
    } else {
      max = 6;
    }
      var count = 0;
      $scope.currentPlaylists = [];
      for (var i = $scope.playListIndex;i<$scope.playListIndex+max;i++) {
        // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
        $scope.currentPlaylists[count] = $scope.allPlayLists[i];
        count++;
      }//for update playlist
      $scope.playListIndex+=max;
      console.log("playlist index is now", $scope.playListIndex);
    }//else if update shouldnt bring the rest of the results
    $scope.attachSource($scope.currentPlaylists, "playlist");
}//UPF

$scope.updatePlaylistBackward = function() {
  var count = 0;
  $scope.currentPlaylists = [];
    $scope.playListIndex-=12;
  for (var i = $scope.playListIndex;i<$scope.playListIndex+6;i++) {
    // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
    $scope.currentPlaylists[count] = $scope.allPlayLists[i];
    count++;
  }//for update playlist
  $scope.playListIndex+=6;
  console.log("playlist index is now", $scope.playListIndex);
  $scope.attachSource($scope.currentPlaylists, "playlist");
}//uplb


////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
//invokes //
$scope.getLatestVids(3);
$scope.getAllPlayLists();
}); //controller
