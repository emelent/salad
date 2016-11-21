var FancySlider = (function(){
  "use strict";

  /**
   * @class FancySlider
   * @classdesc JS class that enables sliding between children
   *
   * @prop {DOMElement} element   - Container element, contains children to slide between
   * @prop {int} depth            - Visibility depth, the max distance a child element
   *                                must have from the focused child element to be
   *                                displayed
   * @prop {int} focus            - Index of focused item
   * @prop {int} animatedTimer    - Id of interval timer, given by setInterval
   *
   * @constructor
   */
  function FancySlider(el, depth=2){
    this.element = el;
    this.depth =  depth;
    this.focus = Math.floor(el.children.length/2);
    this.animateTimer = null;
    this.createClickEvents();
    this.updateChildren();
  }

  /**
   * @desc  Adds onclick event to all child elements of @prop element
   *
   * @return
   */
  FancySlider.prototype.createClickEvents = function(){
    var that = this;
    Array.from(this.element.children).forEach(function(el, i){
      el.onclick = function(){
        that.shiftAnimated(-(that.focus - i));
      };
    });
  };


  /**
   * @desc  Returns the number of child elements within @prop element
   *
   * @return {int}
   */
  FancySlider.prototype.getChildCount = function(){
    return this.element.childElementCount;
  };


  /**
   * @desc  Returns the distance of element at index @param i from the focused element.
   *
   * @param {int} i  -  Index of child element
   *
   * @return {int}
   */
  FancySlider.prototype.getDistFromFocus = function(i){
    return Math.abs(i - this.focus);
  };


  /**
   * @desc  Shift focus right, n times. Note if performing n right shifts would result in
   *        the focus being out of bounds(i.e greater than @prop element's child count)
   *        then no shift will occur.
   *
   * @param {int} n  -  Number of times to perform shift.
   *
   * @return
   */
  FancySlider.prototype.shiftRight = function(n){
    n = Math.abs(n);
    if(this.focus + n > this.getChildCount()-1)
      return;
    this.focus = (this.focus + n) % this.getChildCount();
    this.updateChildren();
  };


  /**
   * @desc  Shift focus left, n times. Note if performing n right shifts would result in
   *        the focus being out of bounds(i.e less than 0)
   *        then no shift will occur.
   *
   * @param {int} n  -  Number of times to perform shift.
   *
   * @return
   */
  FancySlider.prototype.shiftLeft = function (n){
    n = Math.abs(n);
    if(this.focus - n < 0)
      return;
    this.focus = (this.focus - n) % this.getChildCount();
    if(this.focus < 0)
      this.focus = 0;
    this.updateChildren();
  };


  /**
   * @desc  Shift focus n times. This joins both @prop shiftLeft and @ prop shiftRight
   *        methods, using @param n to determine which shift to perform.
   *
   * @param {int} n  -  Number of times to perform shift, negative n, performs left shifts
   *                    while a positive n performs right shifts.
   *
   * @return
   */
  FancySlider.prototype.shift = function(n){
    if(n < 0)
      this.shiftLeft(n);
    else
      this.shiftRight(n);
  };


  /**
   * @desc  Shifts focus n times much like @prop shift, however delays each shift by
   *        (300 / getChildCount()) milliseconds(this could probably be made smoother
   *        with a less linear delay function).
   *
   * @param {int} n  -  Number of times to perform shift, negative n, performs left shifts
   *                    while a positive n performs right shifts.
   *
   * @return
   */
  FancySlider.prototype.shiftAnimated = function(n){
    if(this.animateTimer !== null)
      return;

    var len = Math.abs(n);
    if(len === 0)
      return;

    ///perform initial shift
    var that = this;
    if(n < 0)
      that.shiftLeft(1);
    else
      that.shiftRight(1);
    len --;

    var wait = 300/len;
    this.animatedTimer = setInterval(function () {
      ///stop interval
      if(len < 1){
        clearInterval(that.animatedTimer);
        that.animatedTimer = null;
        return;
      }

      ///perform shift, i.e that.shift(1 * (sign of n))
      that.shift(1 * (n / Math.abs(n)));
      len --;
    }, wait);
  };


  /**
   * @desc  Updates the styling of each @prop element's child element based on the
   *        the child element's distance from the focused element. This controls
   *        most of how the FancySlider looks and feels(this is how I became so fancy xD).
   *
   * @return
   */
  FancySlider.prototype.updateChildren = function(){
    var factor = 0.8;
    var that = this;

    Array.from(this.element.children).forEach(function(el, i){
      ///calculate various property values
      var dist = that.getDistFromFocus(i);
      var scale = (dist == 0)? 1.3: Math.pow(0.8, dist);
      var gray = (dist == 0)? 0 : 50 + (15 * (dist-1)) ;
      var margin = (dist > 1)? -100 : 0;
      margin = (dist > that.depth)? -200: margin;
      scale= (dist > that.depth)? 0: scale;

      ///update element style
      el.style.transform = 'scale(' + scale + ')';
      el.style.zIndex = Math.floor(that.getChildCount() / 2) - dist;
      el.style.margin = '' + margin + 'px';
      el.style.filter = 'grayscale(' + gray + '%)';
      
      ///toggle css class
      if(dist == 0)
        el.classList.add('fs-container__box--focused');
      else
        el.classList.remove('fs-container__box--focused');
    });
  }

  return FancySlider;
}());

