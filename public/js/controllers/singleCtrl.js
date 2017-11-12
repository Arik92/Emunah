app.controller('singleCtrl', function($scope, $stateParams, ytService) {
	console.log("state params here be", $stateParams);
  $scope.video = $stateParams.videoParam;
  if (!$scope.video) {
	  //TODO ytservice.getvideoDetails.
	  ytService.getVideo($stateParams.id).then(function(result){
		  $scope.video = result;
		  console.log("selected video is ", $scope.video);  
		  $scope.video.playurl = "https://www.youtube.com/embed/"+$scope.video.id.videoId;
	  });
  } else {
    console.log("selected video is ", $scope.video);  
   $scope.video.playurl = "https://www.youtube.com/embed/"+$scope.video.id.videoId;
  }//else 
});//singleCtrl
