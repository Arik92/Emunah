(function() {
  // your page initialization code here
  // the DOM will be available here
  const navMenu = document.getElementsByClassName("menu")[0];
  console.log('navMenu', navMenu);
  const megaMenus = document.querySelectorAll(".megamenu");
  console.log('megaMenus', megaMenus);

  navMenu.addEventListener('click', (e) => {
    console.log('menu clicked');
    megaMenus.forEach(menu => menu.style.display = 'none');
  }, true)


})();