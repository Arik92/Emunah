app.controller('storeCtrl', function($scope, $stateParams, lodash) {
  console.log('yo from storeCtrl');
  
  document.addEventListener("scroll", lodash.throttle(transform, 1000));
  
  function transform(e) {
    console.log('fired transform');
    const storeMenu = document.querySelector('.store-menu-overlay');
    const offsetCheck = window.pageYOffset > 78;
    if (offsetCheck && storeMenu) {
      storeMenu.classList.add('transform');
      // document.removeEventListener("scroll", transform);
    } else {
      storeMenu.classList.remove('transform');
    }
  }
});//singleCtrl


