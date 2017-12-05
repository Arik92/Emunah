app.controller('footerCtrl', function($scope, linkService) {
  $scope.footerLinkColumns = [];
  $scope.socialMedia = [];

  this.$onInit = () => {
    console.log('yo from footerCtrl');
    $scope.footerLinkColumns = linkService.footerLinkColumns;
    $scope.socialMedia = linkService.socialMedia;
    console.log($scope.footerLinkColumns);
  }
});//singleCtrl


