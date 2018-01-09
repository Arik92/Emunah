app.controller('articleCtrl', ['$scope', '$state', '$stateParams', 'articleFactory' , function($scope, $state, $stateParams, articleFactory) {
  console.log("factory is", articleFactory);
  $scope.articleName = $stateParams.article;

  $scope.renderArticle = function(name) {
    $scope.article = articleFactory.getArticle(name);
}// renderArticle

  $scope.renderArticle($scope.articleName);
  console.log("current  controller article: ", $scope.article);
}]); //NOTE: might need to foolproof this.see beerlist stateparams
