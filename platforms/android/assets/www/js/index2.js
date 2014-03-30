$(window).on('load', onLoad);

var myScroll;

function onLoad() {
	alert("onLoad...");
	$().ready(function() {
		document.addEventListener("deviceready",
			onDeviceReady, false);
	});
    // onDeviceReady(); //sobra

    // FastClick.attach(document.body);


    // EVENTOS
    $('#header').on('tap', function(evt) {
        if ($('#principal').hasClass('center')) {
            $('#principal').removeClass('center').addClass('right');
            $('#menu').removeClass('left').addClass('center');
        }
        else {
            $('#principal').removeClass('right').addClass('center');
            $('#menu').removeClass('center').addClass('left');
        }
    });

    $('#nav_principal > li').on('tap', function(evt) { 
        alert(this.innerText);
    });
}

function onDeviceReady() {
	alert('onDeviceReady...');

    myScroll = new IScroll('#wrapper');
}
