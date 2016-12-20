$('.menu-stack').click(function(e){
  $('.menu-stack').toggleClass('menu-stack--active');
  $('.container').toggleClass('container--inactive');
  $('.menu').toggleClass('menu--active');
});
$('.slide-menu__title').click(function(e){
  $('.menu-stack').removeClass('menu-stack--active');
  $('.container').removeClass('container--inactive');
  $('.slide-menu').removeClass('slide-menu--active');
});

$('.slide-menu__item').click(function(e){
  $('.menu-stack').removeClass('menu-stack--active');
  $('.container').removeClass('container--inactive');
  $('.slide-menu').removeClass('slide-menu--active');
});

$('.cat').click(function(e){
  var catboxBounds = document.querySelector('.catbox')
    .getBoundingClientRect();
  $('.cat--active').removeClass('cat--active');
  var box = $(this).addClass('cat--active')[0]
    .getBoundingClientRect();
  $('.cat-underline').css({
    'width': box.width  + 'px',
    'left': box.left - catboxBounds.left + 'px'
  });
});

$('.searchbox input').on('focus', function(){
  $('.searchbox').addClass('searchbox--active'); 
  $('.cat').css('display', 'none');
  $('.cat--active').css('display', 'initial');
  $('.cat-underline').css('left', '0px');
}).on('blur', function(){
  $('.searchbox').removeClass('searchbox--active'); 
  $('.cat').css('display', 'initial');
  setTimeout(function(){
    $('.cat--active').click();
    updateCatList();
  }, 400);
});

var initialTop = 100;

$(document).on('ready', function(){
  var initScroll = window.scrollY;
  window.scrollTo(0, 0);
  initialTop = document.querySelector('.searchbar')
  .getBoundingClientRect().top;
  window.scrollTo(0, initScroll);
  $('.cat--active').click();
});

$(document).on('scroll', function(){
  var el = document.querySelector('.searchbar');
  var menuBtn = document.querySelector('.menu-stack');
  if(window.scrollY >= initialTop){
    el.classList.add('searchbar--nav');
    menuBtn.classList.add('menu-stack--visible');
  }else{
    el.classList.remove('searchbar--nav');
    menuBtn.classList.remove('menu-stack--visible');
  }
  updateCatList();
});

function onMobile(){
  return window.innerWidth < 670;
}

function updateCatList(){
  var list = $('.drop-cat-list');
  if(!onMobile()){
    var rect = $('.dropdown-catbox')[0].getBoundingClientRect();
    list.css({
      left: rect.left + 'px',
      width: rect.width + 'px',
      top: rect.bottom + 'px'
    });
  }else{
    var el = document.querySelector('.searchbar');
    var rect = el.getBoundingClientRect();
    if(el.classList.contains('searchbar--nav')){
      list.css({
        top: rect.bottom + 'px',
        left: '0px',
        width:'100%'
      });
    }else{
      list.css({
        left: rect.left + 20 + 'px',
        width: rect.width - 40 + 'px',
        top: rect.bottom + 'px'
      });
    }
  }
}
$('.drop-cat-title').click(function(){
  updateCatList();
  $('.dropdown-catbox').toggleClass('dropdown-catbox--active');
});

$('.drop-cat').click(function(){
  $('.drop-cat--active').removeClass('drop-cat--active');
  $(this).toggleClass('drop-cat--active');
  $('.drop-cat-title').click();
});
