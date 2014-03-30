$(window).on('load', onLoad);

function onLoad() {
	alert("onLoad...");
	$().ready(function() {
		document.addEventListener("deviceready",
			onDeviceReady, false);
	});
}

function onDeviceReady() {
	alert('onDeviceReady...');
    $('#header').on('touchstart', function(evt) {
        if ($('#principal').hasClass('center')) {
            console.log('click on header - muestra menu');
            $('#principal').removeClass('center').addClass('right');
            $('#menu').removeClass('left').addClass('center');
        }
        else {
            console.log('click on header - oculta menu');
            $('#principal').removeClass('right').addClass('center');
            $('#menu').removeClass('center').addClass('left');
        }
    });

    x$('#nav_principal > li').on('touchstart', function(evt) { 
        // console.log(this.innerText);
        alert(this.innerText);
    });

}