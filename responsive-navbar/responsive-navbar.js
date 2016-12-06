var ResponsiveNavbar = (function(window){
  'use strict';

  var classNames = {
    navbar: 's-navbar',
    navbarCol: 's-navbar__col',
    navbarColLeft: 's-navbar__left',
    navbarColCenter: 's-navbar__center',
    navbarColRight: 's-navbar__right',
    navbarItem: 's-navbar__item',
    navbarLogo: 's-navbar__logo',
    navbarBrand: 's-navbar__brand',
    menuStack: 's-stack',
    menu: 's-nav-menu',
    menuItem: 's-nav-menu__item'
  };

  function ResponsiveNavbar(el){
    this.element = el;
    var that = this; 
    this.onResize();
    window.addEventListener('resize', function(){
      that.onResize();
    });
  }

  ResponsiveNavbar.prototype.prepareMenu = function(){
  };

  ResponsiveNavbar.prototype.onResize = function(){
    var width = window.innerWidth;
    var navbarItems = this.element.querySelectorAll(
      '.' + classNames.navbarItem
    );
    var navbarCenter = this.element.querySelector(
      '.' + classNames.navbarColCenter
    );
    var menuStack = this.element.querySelector(
      '.' + classNames.menuStack
    );

    if(width < 768){
      //hide navbar items
      for(var i=0; i < navbarItems.length; i++){
        navbarItems[i].style.display = 'none';
      }
      //hide center column
      navbarCenter.style.display = 'none';
      menuStack.style.display = 'inline-block';
    }else{
      //show navbar items
      for(var i=0; i < navbarItems.length; i++){
        navbarItems[i].style.display = 'inline-block';
      }
      navbarCenter.style.display = 'flex';
      menuStack.style.display = 'none';
    }
  };
  
  return ResponsiveNavbar;
}(window));

// Export module
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = ResponsiveNavbar;
}
