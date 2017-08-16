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
      console.log("playlist data is", data);
      $scope.allPlayLists = data.items; // an array of 48 playLists
      $scope.playListIndex = 0;
      $scope.numRes = data.pageInfo.totalResults;
      $scope.currentPlaylists = [];
      $scope.updatePlaylistForward();
      $scope.nextToken = data.nextPageToken;
    }//else
  });//callback
}//getAllPlaylists

$scope.getNextPlayLists = function() {
  ytService.getNextPlayLists($scope.nextToken).then(function(data, err){
    if (err) {
      console.log("controller error fetching next playlists");
    } else {
      for (var i = 0;i<data.items.length;i++) {
          $scope.allPlayLists.push(data.items[i]);
      }//for
      console.log("array after fetch loop", $scope.allPlayLists);
      $scope.prevToken = data.prevPageToken;
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
      var count = 0;
    $scope.currentPlaylists = [];
    for (var i = $scope.playListIndex;i<$scope.playListIndex+6;i++) {
      // $scope.currentPlaylists.push($scope.allPlayLists[i]); //NOTE: We might actually want this behaviour
      $scope.currentPlaylists[count] = $scope.allPlayLists[i];
      count++;
    }//for update playlist
    $scope.playListIndex+=6;
    console.log("playlist index is now", $scope.playListIndex);
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


////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
//invokes //
$scope.getLatestVids(3);
$scope.getAllPlayLists();
}); //controller
