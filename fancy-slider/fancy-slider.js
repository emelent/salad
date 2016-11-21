var FancySlider = (function(){
  "use strict";

  function FancySlider(el, depth=2){
    this.element = el;
    this.depth =  depth;
    this.focus = Math.floor(el.children.length/2);
    this.animateTimer = null;
    this.createClickEvents();
    this.updateChildren();
  }

  FancySlider.prototype.createClickEvents = function(){
    var that = this;
    Array.from(this.element.children).forEach(function(el, i){
      el.onclick = function(){
        that.shiftAnimated(-(that.focus - i));
      };
    });
  };

  FancySlider.prototype.getItemCount = function(){
    return this.element.childElementCount;
  };

  FancySlider.prototype.shiftRight = function(n){
    n = Math.abs(n);
    if(this.focus + n > this.getItemCount()-1)
      return;
    this.focus = (this.focus + n) % this.getItemCount();
    this.updateChildren();
  };

  FancySlider.prototype.shiftLeft = function (n){
    n = Math.abs(n);
    if(this.focus - n < 0)
      return;
    this.focus = (this.focus - n) % this.getItemCount();
    if(this.focus < 0)
      this.focus = 0;
    this.updateChildren();
  };

  FancySlider.prototype.getDistFromFocus = function(i){
    return Math.abs(i - this.focus);
  };

  FancySlider.prototype.shift = function(n){
    if(n < 0)
      this.shiftLeft(n);
    else
      this.shiftRight(n);
  };

  FancySlider.prototype.shiftAnimated = function(n){
    if(this.animateTimer !== null) return;

    var len = Math.abs(n);
    if(len === 0) return;
    var that = this;
    if(n < 0) that.shiftLeft(1);
    else that.shiftRight(1);
    len --;
    var wait = 300/len;
    this.animatedTimer = setInterval(function () {
        if(len < 1){
          clearInterval(that.animatedTimer);
          that.animatedTimer = null;
          return;
        }

        if(n < 0) that.shiftLeft(1);
        else that.shiftRight(1);
        len --;
    }, wait);
  };

  FancySlider.prototype.updateChildren = function(){
    var factor = 0.8;
    var that = this;
    Array.from(this.element.children).forEach(function(el, i){
      var dist = that.getDistFromFocus(i);
      var scale = (dist == 0)? 1.3: Math.pow(0.8, dist);
      var gray = (dist == 0)? 0 : 50 + (15 * (dist-1)) ;
      var margin = (dist > 1)? -100 : 0;
      margin = (dist > that.depth)? -200: margin;
      scale= (dist > that.depth)? 0: scale;
      //update styles
      el.style.transform = 'scale(' + scale + ')';
      el.style.zIndex = Math.floor(that.getItemCount() / 2) - dist;
      el.style.margin = '' + margin + 'px';
      el.style.filter = 'grayscale(' + gray + '%)';

    });
  }

  return FancySlider;
}());

