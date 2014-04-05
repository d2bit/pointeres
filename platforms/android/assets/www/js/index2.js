$(window).on('load', onLoad);

var whereiam;
var myScroll;
var videoPlayer;

function onLoad() {

    myScroll = new IScroll('.content', {
        mouseWheel: false,
        scrollbars: false,
        tap: true
    });

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

    $('#principal li').on('tap', function(evt) { 
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
    });

    $('#video_iglesia').on('tap', function() {
        // $('#player').removeClass('right').addClass('center');
        // cargaVideo('M7lc1UVf-VE');
        // console.log('cargando video...');
        if (checkConnection()) {
            // videoPlayer = window.open('http://www.youtube.com/embed/gAdOFQaP66A?list=UUvdmEDFj2FtEdyaOW8zSjIA', '_self', 'location=no');
            videoPlayer = true;
            $('#videoPlayer').removeClass('right').addClass('center');
            $('#' + whereiam).removeClass('center').addClass('left');
            $('#videoPlayer > .content').html('<iframe width="100%" src="http://www.youtube.com/embed/u6RFyVN9sNg#autoplay=1" frameborder="0" allowfullscreen></iframe>');
        }
    })

    $('#check_conn').on('tap', checkConnection);
}
function volverAtras() {
    if (videoPlayer) {
        videoPlayer = false;
        $('#videoPlayer').removeClass('center').addClass('right');
        $('#' + whereiam).removeClass('left').addClass('center');
        // $('#videoPlayer > .content').html('');
        return;
    }
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

}
function onBackButton(evt) {
    // alert('onBackButton');
    if (volverAtras()) { // si estem en la principal tanquem la app
        navigator.app.exitApp();
    }
}



/* CHECK CONNECTION */
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    // states[Connection.ETHERNET] = 'Ethernet connection';
    // states[Connection.WIFI]     = 'WiFi connection';
    // states[Connection.CELL_2G]  = 'Cell 2G connection';
    // states[Connection.CELL_3G]  = 'Cell 3G connection';
    // states[Connection.CELL_4G]  = 'Cell 4G connection';
    // states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // alert('Connection type: ' + states[networkState]);
    if (networkState in states) {
        alert('Debes conectar los datos para ver los videos..');
        return false;
    }
    return true;
}