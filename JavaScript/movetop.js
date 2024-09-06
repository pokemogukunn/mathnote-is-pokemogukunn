jQuery.easing.quart = function (x, t, b, c, d) {
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
};
 
 
jQuery(function($){
	$("body").append('<a href="#" id="move_top"><i class="fas fa-angle-up"></i></a>');
	var topBtn = $('#move_top');	
	topBtn.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
    topBtn.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500, 'quart');
		return false;
    });
});
