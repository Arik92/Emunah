app.controller('shortPlCtrl', function($scope, ytService, $stateParams) {
  this.$onInit = () => {
    getPlayLists();
    }
	 function getPlayLists() {
		 ytService.getPlaylistsByQuery('short').then(function(result){
			 console.log("short lectures are ",result);
			 if (result.nextPageToken) {
				$scope.nextPageToken = result.nextPageToken;
			 }//if
			 $scope.playLists = result.items;
		 });
	 }
  $scope.updatePlayListForward = function(){
		 if ($scope.nextPageToken) {
		 ytService.getPageQueryPlaylists('short',$scope.nextPageToken).then(function(result){
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
		 if ($scope.prevPageToken) {
		 ytService.getPageQueryPlaylists('short',$scope.prevPageToken).then(function(result){
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
}
);//singleCtrl
