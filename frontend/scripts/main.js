;(function ($) {

	var getData = function (url, tplId, anchor) {
		$.getJSON(url, function (data) {
			$(".spinner").removeClass('hidden');
			setTimeout(function () {
				var template = $(tplId).html();
				var stone = Handlebars.compile(template)(data);
				$(anchor).append(stone);
				$(".spinner").addClass('hidden');
			}, 3000);
		});
	};

	$('[data-role="get-more-service"]').click(function (e) {
		e.preventDefault();
		getData('inc/services.json', '#getServices', '[data-role="service-anchor"]');
		$(this).fadeOut("slow");
	});

	getData('inc/t_services.json', '#getTopServices', '[data-role="service-top-anchor"]');


	$('[data-role="carousel-main"]').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'linear'
	});

	$('[data-role="carousel-clients"]').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 2
	});



})(jQuery);