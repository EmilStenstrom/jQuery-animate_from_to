/*
 * jQuery Animate From To plugin 1.0
 *
 * Copyright (c) 2011 Emil Stenstrom <http://friendlybit.com>
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	
	$.fn.animate_from_to = function(targetElm, options){
		return this.each(function(){
			animate_from_to(this, targetElm, options);
		});
	};

	$.extend({
		animate_from_to: animate_from_to
	});
	

	function animate_from_to(sourceElm, targetElm, options) {
           var source = $(sourceElm).eq(0),
               target = $(targetElm).eq(0);

           var defaults = {
               pixels_per_second: 3000,
               initial_css: {
                   "background": "#dddddd",
                   "opacity": 0.8,
                   "position": "absolute",
                   "top": 0,
                   "top": source.offset().top,
                   "left": source.offset().left,
                   "height": source.css('height'),
                   "width": source.css('width'),
                   "z-index": 100000
               },
               callback: function(){ return; }
           }
           if (options && options.initial_css) {
               options.initial_css = $.extend({}, defaults.initial_css, options.initial_css);
           }
           options = $.extend({}, defaults, options);

           var dy = source.offset().top - target.offset().top,
               dx = source.offset().left - target.offset().left,
               pixel_distance = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))),
               duration = Math.floor((pixel_distance/options.pixels_per_second)*10000),

               shadow = $('<div></div>')
                   .css(options.initial_css)
                   .appendTo('body')
                   .animate({
                       top: target.offset().top,
                       left: target.offset().left,
                       height: target.innerHeight(),
                       width: target.innerWidth()
                   }, {
                       duration: duration
                   })
                   .animate({
                       opacity: 0
                   }, {
                       duration: 100,
                       complete: function(){
                           shadow.remove();
                           return options.callback();
                       }
                   });
	}
	
})(jQuery);