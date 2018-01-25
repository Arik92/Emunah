app.controller('singleCtrl', ['$scope', '$stateParams', 'ytService', function($scope, $stateParams, ytService) {
	 
  this.$onInit = () => {
	  console.log("state params here be", $stateParams); 
		ytService.getVideo($stateParams.id).then(function(result){
			console.log("single result", result);
		  $scope.video = result;
		  console.log("selected video is ", $scope.video);  
		  $scope.video.playurl = "https://www.youtube.com/embed/"+$scope.video.id;
	  });
	}//onInit 	  
	  
  
}]);//singleCtrl
