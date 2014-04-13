$(window).on('load', onLoad);

var whereiam;
var myScroll;
var videoPlayer = false;
var map = false;

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
window.lastClickTime = new Date().getTime();
    $('#principal li').on('tap', function(evt) { 
        //alert(this.innerText, $(this).attr('data-menu'));
        var current = new Date().getTime();
        var delta = current - lastClickTime;
        if (delta < 400) break;
        window.lastClickTime = current;
        if ($(this).attr('data-menu') === 'scan') {
            /*alert('scantab: '+ scantab);
            if (scantab) break;
            scantab++;*/
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    /*alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);*/
                    var splittedText = result.text.split('/');
                    if (splittedText[2] !== 'www.pointeres.es') {
                        alert('Código QR inválido 2');
                    }
                    else if (splittedText[3] === 'teulada') {
                        if (splittedText[4] === 'iglesia') {
                            if (checkConnection()) {
                                // videoPlayer = window.open('http://www.youtube.com/embed/gAdOFQaP66A?list=UUvdmEDFj2FtEdyaOW8zSjIA', '_self', 'location=no');
                                videoPlayer = true;
                                $('#videoPlayer').removeClass('right').addClass('center');
                                $('#principal').removeClass('center').addClass('left');
                                $('#videoPlayer > .content').html('<iframe width="100%" src="http://www.youtube.com/embed/u6RFyVN9sNg#autoplay=1" frameborder="0" allowfullscreen></iframe><br><button onclick="window.plugins.socialsharing.share(\'Message only\')">Share</button><br><button onclick="window.plugins.socialsharing.canShareVia(\'whatsapp\', \'msg\', null, null, null, function(e){alert(\'si\')}, function(e){alert(e)})">is WhatsApp available?</button><br><button onclick="window.plugins.socialsharing.canShareVia(\'mms\', \'msg\', null, null, null, function(e){alert(\'si\')}, function(e){alert(e)})">is SMS available?</button>');
                            }
                        }
                        else alert('Código QR inválido 4');
                    }
                    else alert('Código QR inválido 3');
                }, 
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
            //scantab = 0;
        }
        else if (whereiam !== 'menu') {
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
            $('#videoPlayer > .content').html('<iframe width="100%" src="http://www.youtube.com/embed/u6RFyVN9sNg#autoplay=1" frameborder="0" allowfullscreen></iframe><br><button onclick="window.plugins.socialsharing.share(\'Message only\')">Share</button><br><button onclick="window.plugins.socialsharing.canShareVia(\'whatsapp\', \'msg\', null, null, null, function(e){alert(\'si\')}, function(e){alert(e)})">is WhatsApp available?</button><br><button onclick="window.plugins.socialsharing.canShareVia(\'mms\', \'msg\', null, null, null, function(e){alert(\'si\')}, function(e){alert(e)})">is SMS available?</button>');
        }
    });
    $('#mapa_teulada').on('tap', function(evt) {
        $('#map').removeClass('right').addClass('center');
        $('#' + whereiam).removeClass('center').addClass('left');
        map = true;

        alert('test');
        
        if (GMaps) alert('GMaps working');
        else alert('GMaps not working');
        GMaps.geolocate({
          success: function(position){
            lat = position.coords.latitude;  // guarda coords en lat y lng
            lng = position.coords.longitude;
            alert(lat, lng);

            map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
              el: '#mapplace',
              lat: lat,
              lng: lng
            });
            map.addMarker({ 'lat': lat, 'lng': lng });  // marcador en [lat, lng]
          },
          error: function(error) { alert('Geolocalización falla: '+error.message); },
          not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
        });
    });

    $('#check_conn').on('tap', checkConnection);
}
function volverAtras() {
    if (videoPlayer) {
        // alert('videoplayer');
        videoPlayer = false;
        $('#videoPlayer').removeClass('center').addClass('right');
        if (whereiam) {
            $('#' + whereiam).removeClass('left').addClass('center');
        }
        else {
            $('#principal').removeClass('left').addClass('center');
        }
        // $('#videoPlayer > .content').html('');
        return;
    }
    else if (map) {
        // alert('map');
        map = false;
        $('#map').removeClass('center').addClass('right');
        $('#' + whereiam).removeClass('left').addClass('center');
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

/* SOCIAL SHARING API 
https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
*/