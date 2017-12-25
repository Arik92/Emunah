app.controller('storeCtrl', function ($scope, $stateParams, $location, lodash, storeService) {
  console.log('yo from storeCtrl');
  let throttleScroll;
  this.$onInit = () => {
    console.log('hello from oninit');
    $scope.products = storeService.products;
    console.log($scope.products);

    /* throttleScroll = lodash.throttle(transform, 1000);
    if (screen.width > 1090) {
      document.addEventListener("scroll", throttleScroll );
    } */
  }

  // $scope.$on("$destroy", removeMe);

  $scope.isActive = function (route) {
    const isItActive = route === $location.path();
    return isItActive;
  }

  function removeMe() {
    console.log('storeCtrl was destroyed');
    document.removeEventListener("scroll", throttleScroll);
  }

  function transform() {
    console.log('fired transform');
    const storeMenu = document.querySelector('.store-menu-overlay');
    const offsetCheck = window.pageYOffset > 78;
    if (offsetCheck && storeMenu) {
      storeMenu.classList.add('transform');
    } else {
      storeMenu.classList.remove('transform');
    }
  }
});//singleCtrl


