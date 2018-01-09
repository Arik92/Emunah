app.controller('footerCtrl', [ '$scope', 'linkService', function ($scope, linkService) {
  $scope.footerLinkColumns = [];
  $scope.socialMedia = [];

  this.$onInit = () => {
    console.log('yo from footerCtrl');
    $scope.footerLinkColumns = linkService.footerLinkColumns;
    $scope.socialMedia = linkService.socialMedia;
    console.log($scope.footerLinkColumns);
  }


  $scope.toTop = () => {
    console.log('take me to the top');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}]);//singleCtrl


