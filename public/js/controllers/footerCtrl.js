app.controller('footerCtrl', function($scope, linkService) {
  $scope.footerLinks = [];

  this.$onInit = () => {
    console.log('yo from footerCtrl');
    $scope.footerLinks = linkService.footerLinks;
    console.log($scope.footerLinks);
  }
});//singleCtrl


