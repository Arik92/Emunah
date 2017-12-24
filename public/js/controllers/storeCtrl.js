app.controller('storeCtrl', function ($scope, $stateParams, lodash) {
  console.log('yo from storeCtrl');
  let throttleScroll;
  this.$onInit = () => {
    console.log('hello from oninit');
    throttleScroll = lodash.throttle(transform, 1000);
    if (screen.width > 1090) {
      document.addEventListener("scroll", throttleScroll );
    }
  }

  $scope.$on("$destroy", removeMe);

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


