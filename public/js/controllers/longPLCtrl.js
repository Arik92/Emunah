app.controller('longPlCtrl', function($scope, ytService, $stateParams) {
  this.$onInit = () => {
    getPlayLists();
    }
	 function getPlayLists() {
		 ytService.getPlaylistsByQuery('full').then(function(result){			 
			 $scope.playLists = result.items;
			 if (result.nextPageToken) {
				$scope.nextPageToken = result.nextPageToken;
			 }//if
			 console.log("long lectures are ",result);
		 });
	 }
	 $scope.updatePlayListForward = function(){
		 if ($scope.nextPageToken) {
		 ytService.getPageQueryPlaylists('full',$scope.nextPageToken).then(function(result){
			 console.log("Next result",result);
			 $scope.playLists = result.items;
			 if (result.nextPageToken) {
				 $scope.nextPageToken = result.nextPageToken;
			 }
			 if (result.prevPageToken) {				 
			 $scope.prevPageToken = result.prevPageToken;
			 }
		 })
		 }
	 };//updateplaylistForward
	 $scope.updatePlayListBackward = function(){
		 		 console.log("prev page token", $scope.prevPageToken);
		 if ($scope.prevPageToken) {
		 ytService.getPageQueryPlaylists('full',$scope.prevPageToken).then(function(result){
			 console.log("Prev result",result);
			 $scope.playLists = result.items;
			 if (result.nextPageToken) {
				 $scope.nextPageToken = result.nextPageToken;
			 }
			 if ($scope.prevPageToken) {
			 $scope.prevPageToken = result.prevPageToken;
			 }
		 })
		 };
	 }//updateplaylistbackward
  
});//singleCtrl
