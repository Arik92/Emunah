app.controller('homeCtrl', function($rootScope, $scope, $state, authFactory, ytService) {
  console.log("auth user data to work with", authFactory.currentUser);
  $rootScope.currentUser = authFactory.currentUser.email;
  $scope.topThree = [];
  ////////****************************LATEST VIDEO INTERFACE ******************************8/////////////////////
  $scope.getLatestVids = function(num) {
  ytService.getLatestVids(num).then(function(data, err){
    if (err) {
      console.error("controller error fetching latest videos", err);
    } else {
      $scope.footerVids = data.items;
      $scope.topThree = data.items.splice(0,3);
      console.log("top three videos are ", $scope.topThree);
      $scope.latestVids = data.items;

      console.log("latest vids are", data.items);
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
      $scope.footerPlaylists = $scope.allPlayLists.slice(0,35);
      $scope.playListIndex = 0;
      $scope.numRes = data.pageInfo.totalResults;
      $scope.currentPlaylists = [];
      $scope.updatePlaylistForward();
      $scope.nextToken = data.nextPageToken;
    }//else
  });//callback
}//getAllPlaylists

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
}//uplb

$scope.setCurr = function(obj, type) {
  if (type==='playlist') {
  $rootScope.playlistParam = obj;
  } else {
  console.log("gotta complete this");
  }//else type is a playlist
  $state.go('player');
}//setCurr

////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
//invokes //
$scope.getLatestVids(15);
$scope.getAllPlayLists();
$scope.state = $state;
$scope.inState = function(state){
  console.log("checking for state... it is now",  $state.router.globals.current.name)
    return $state.is(state);
}
$(document).ready(function(){
  $('.owl-carousel').owlCarousel();
});
console.log("state is ", $state.router.globals.current.name);
}); //controller
