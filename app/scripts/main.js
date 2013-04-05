require(['jquery', 'underscore'], function($, _){

	var adsEvery = 15;

	var rando = function() { return _.random(150, 300); };
	var itemTmpl = _.template('<li><img src="http://placekitten.com/g/<%= x %>/<%= y %>"></li>');
	var adTmpl = _.template('<li class="ad-container"><div class="ad"><img src="http://placehold.it/300x250"></div></li>');

	function randomCats(count) {
		var cats = _(_.range(1, count)).chain()
			.map(function() { return {x: rando(), y: rando()}; })
			.map(function(point, index) {
				var markup = itemTmpl(point);
				if (adsEvery && index % adsEvery === 0) {
					markup += adTmpl();
				}
				return markup;
			})
			.value();

		return cats;
	}

	$(function() {
		var catList = $('.stream ul');

		$('button.add-cats').on('click', function(e) {
			catList.prepend(randomCats(15));
		});
	});
});