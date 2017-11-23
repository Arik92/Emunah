(function() {
  
  console.log('yo from header.js');
  const navMenu = document.getElementsByClassName("menu")[0];
  const menuLIs = document.querySelectorAll(".menu li");
  const megaMenus = document.querySelectorAll(".megamenu");

  // event delegation on navbar to hide mega menus
  navMenu.addEventListener('click', (e) => {
    console.log('menu clicked');
    megaMenus.forEach(menu => menu.classList.add('display-none'));
  }, true);

  // remove display none class on mouseover so hover can display
  menuLIs.forEach(li => {
    li.addEventListener('mouseenter', (e) => {
      // debugger;
      megaMenus.forEach((menu) => {
        menu.classList.remove('display-none'); 
      })
    })
  });


})();