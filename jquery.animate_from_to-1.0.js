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
            pixels_per_second: 1000,
            initial_css: {
                "background": "#dddddd",
                "opacity": 0.8,
                "position": "absolute",
                "top": source.offset().top,
                "left": source.offset().left,
                "height": source.height(),
                "width": source.width(),
                "z-index": 100000,
                "image": ""
            },
            square: '',
            callback: function(){ return; }
        }
        if (options && options.initial_css) {
            options.initial_css = $.extend({}, defaults.initial_css, options.initial_css);
        }
        options = $.extend({}, defaults, options);

        var target_height = target.innerHeight(),
            target_width = target.innerWidth();

        if (options.square.toLowerCase() == 'height') {
            target_width = target_height;
        } else if (options.square.toLowerCase() == 'width') {
            target_height = target_width;
        }

        var shadowImage = "";
        if (options.initial_css.image != "") {
            shadowImage = "<img src='" + options.initial_css.image + "' style='width: 100%; height: 100%' />";
        }

        var dy = source.offset().top + source.width()/2 - target.offset().top,
            dx = source.offset().left + source.height()/2 - target.offset().left,
            pixel_distance = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))),
            duration = (pixel_distance/options.pixels_per_second)*1000,

            shadow = $('<div>' + shadowImage + '</div>')
                .css(options.initial_css)
                .appendTo('body')
                .animate({
                    top: target.offset().top,
                    left: target.offset().left,
                    height: target_height,
                    width: target_width
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
