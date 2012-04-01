/*
* jQuery Tiles by Diego Imbriani aka Darko Romanov http://romanovian.com
* ----------------------------------------------------------------------------
* "THE BEER-WARE LICENSE" (Revision 42):
* <darko.romanov@gmail.com> wrote this file. As long as you retain this notice you
* can do whatever you want with this stuff. If we meet some day, and you think
* this stuff is worth it, you can buy me a beer
* ----------------------------------------------------------------------------
*/

(function($){
	$.fn.tiles = function(options) {
		
		function headsOrTails(balance) {
			return Math.random() >= balance;
		}
		
		var defaults = {
			margin:3,
			balance:.5,
			callback:null,
			shuffle:false,
			target:"#tiles",
			anchor:false,
			minHeight:50,
			minWidth:50,
			contentClass:"content"
		};
		var options = $.extend(defaults, options); 
		
		return this.each(function() {

			if($(options.target).size() == 0) {				
				return false;
			}
			var tiles = $(options.target).empty();
			var w = tiles.width();
			var h = tiles.height();
			
			
			$(options.target).css("padding", options.margin + "px 0 0 " + options.margin + "px");
			var first = $("<div class='tiles-item' />");
			first.width(w);
			first.height(h);
			
			tiles.append(first);
			
			var depth=0;
			var control = 0;
			while(depth<$(this).children().size() - 1 && control++ < 1000) {
							
				var items = tiles.find(".tiles-item:empty");
				var index = Math.floor(Math.random() * items.size());
				
				var item = items.eq(index);
				var _w = item.width();
				var _h = item.height();
				
				var w1 = 0;
				var h1 = 0;
				var w2 = 0;
				var h2 = 0;
				
				if(headsOrTails(options.balance)) {
					h1 = Math.round(Math.random() * _h);
					w1 = _w;
					w2 = _w;
					h2 = _h - h1;
					
					if(h1 < options.minHeight || h2 < options.minHeight)
						continue;
					
				} else {
					w1 = Math.round(Math.random() * _w);
					w2 = _w - w1;
					h1 = _h;
					h2 = _h;
					
					if(w1 < options.minWidth || w2 < options.minWidth)
						continue;
				}			
				
				var child1 = $("<div class='tiles-item' />");
				child1.width(w1);
				child1.height(h1);
				child1.css({
					float: "left",
					overflow: "hidden"
				});
				
				var child2 = $("<div class='tiles-item' />");
				child2.width(w2);
				child2.height(h2);
				child2.css({
					float: "left",
					overflow: "hidden"
				});
				
				item.append(child1).append(child2);
				
				depth++;
			}
			
			var tiles_offset = $(options.target).offset();
			var tiles_left = tiles_offset.left;
			var tiles_top = tiles_offset.top;
						
			if(options.shuffle && typeof $.shuffle == "function")			
				$(this).shuffle();

			var tiles = $(this);
			$(options.target).find(".tiles-item:empty").each(function (i, e) {				
				$(e).addClass(options.contentClass).css("margin", "0 " + options.margin + "px " + options.margin + "px 0");
				$(e).width($(e).width() - options.margin);
				$(e).height($(e).height() - options.margin);
				var item =  $(tiles).children().eq(i).clone(true);
				item.appendTo($(e));
				var offset = item.offset();
				var left = (offset.left - tiles_left) * -1;
				var top = (offset.top - tiles_top) * -1;
					
				if(options.anchor) {
					item.css("margin-top", top+"px");
					item.css("margin-left", left+"px");
				}
			});
			
			if(typeof options.callback == "function")
				options.callback.call();
		});
	};
})(jQuery);
