app.controller('artileCtrl', function($scope, articleFactory, $state, $stateParams) {
  $scope.articleName = $stateParams.article;
  $articleFactory.getArticle.then(function(err, res){
    if (err) {
      console.error(err);
    } else {
      console.log("response from article factory");
      $scope.article = res.data;
    } //else
  }) ///callack
}); //NOTE: might need to foolproof this.
