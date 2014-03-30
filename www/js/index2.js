x$(window).on('load', onLoad);

function onLoad() {
	alert("onLoad...");
	x$.ready(function() {
		document.addEventListener("deviceready",
			onDeviceReady, false);
	});
}

function onDeviceReady() {
	alert('onDeviceReady...');
    x$('#header').on('touchstart', function(evt) {
        if (x$('#principal').hasClass('center')) {
            console.log('click on header - muestra menu');
            x$('#principal').removeClass('center').addClass('right');
            x$('#menu').removeClass('left').addClass('center');
        }
        else {
            console.log('click on header - oculta menu');
            x$('#principal').removeClass('right').addClass('center');
            x$('#menu').removeClass('center').addClass('left');
        }
    });
}