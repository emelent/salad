$('.menu-stack').click(function(e){
  $('.menu-stack').toggleClass('menu-stack--active');
  $('.container').toggleClass('container--inactive');
  $('.slide-menu').toggleClass('slide-menu--active');
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
  }, 400);
});
