$(window).on('load', onLoad);

var myScroll;
var whereiam;

function onLoad() {
	// alert("onLoad...");
	$().ready(function() {
		document.addEventListener("deviceready",
			onDeviceReady, false);
        document.addEventListener("backbutton",
            onBackButton, false);
	});
    // onDeviceReady(); //sobra

    FastClick.attach(document.body);


    // EVENTOS
    $('.icon-menu').on('tap', function(evt) {
        if ($('#principal').hasClass('center')) {
            whereiam = 'menu';
            $('#principal').removeClass('center').addClass('right');
            $('#menu').removeClass('left').addClass('center');
        }
        else {
            whereiam = undefined;
            $('#principal').removeClass('right').addClass('center');
            $('#menu').removeClass('center').addClass('left');
        }
    });

    $('#nav_principal > li').on('tap', function(evt) { 
        // alert(this.innerText, $(this).attr('data-menu'));

        if (whereiam !== 'menu') {
            whereiam = $(this).attr('data-menu');
            if (whereiam) {
                $('#principal').removeClass('center').addClass('left');
                $('#' + whereiam).removeClass('right').addClass('center');
            }
        }
    });

    $('.boton-atras').on('tap', function(evt) {
        volverAtras();
    })
}
function volverAtras() {
    switch (whereiam) {
        case 'menu':
            $('#principal').removeClass('right').addClass('center');
            $('#menu').removeClass('center').addClass('left');
            break;
        case undefined:
            return true;
        default:
            $('#principal').removeClass('left').addClass('center');
            $('#' + whereiam).removeClass('center').addClass('right');
    }
    whereiam = undefined;
}
function onDeviceReady() {
	// alert('onDeviceReady...');

    myScroll = new IScroll('#principal');
}
function onBackButton(evt) {
    // alert('onBackButton');
    if (volverAtras()) { // si estem en la principal tanquem la app
        navigator.app.exitApp();
    }
}
