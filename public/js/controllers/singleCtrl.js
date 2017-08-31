app.controller('singleCtrl', function($rootScope, $scope, $stateParams) {
  $scope.video = $stateParams.videoParam;
  if (!$scope.video.playurl) {
  $scope.video.playurl = "https://www.youtube.com/embed/"+$scope.video.id.videoId;
}// if its a video and needs playurl
  console.log("selected video is ", $scope.video);
});
