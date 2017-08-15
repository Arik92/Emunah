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
      $scope.currentPlaylists = data.items;
      $scope.nextToken = data.nextPageToken;

      //$scope.nextToken =
    }//else
  });//callback
}//getAllPlaylists

////////////*************************PLAYLIST INTERFACE **********************************8////////////////////////
//invokes //
$scope.getLatestVids(3);
$scope.getAllPlayLists();
}); //controller
