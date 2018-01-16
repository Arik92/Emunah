app.controller('donateCtrl', function ($scope, $stateParams, $location, $timeout, lodash, donateService) {
  console.log('yo from donateCtrl');
  let throttleScroll;
  this.$onInit = () => {
    console.log('hello from oninit');
    $scope.spinnerShow = true;
    hideSpinner();
    $scope.products = donateService.products;
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

  function hideSpinner() {
    $timeout(() => {
      $scope.spinnerShow = false;
    }, 500)
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


