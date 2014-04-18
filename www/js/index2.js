
        document.addEventListener("deviceready",
            onLoad, false);
        // alert($);
// $(window).on('load', onLoad);
// alert('test');

// window.addEventListener("load",
//             onLoad, false);

var whereiam;
var myScroll;
var videoPlayer = false;
var map = false;

function onLoad() {
// alert('loading...');
rechargeLang();
    myScroll = new IScroll('.content', {
        mouseWheel: false,
        scrollbars: false,
        tap: true
    });

	// alert("onLoad...");
	$().ready(function() {
		// document.addEventListener("deviceready",
		// 	onDeviceReady, false);
        document.addEventListener("backbutton",
            onBackButton, false);
	});
    // onDeviceReady(); //sobra

    FastClick.attach(document.body);

    if (GMaps) {
        GMaps.geolocate({
            success: function(position){
                window.lat = position.coords.latitude;  // guarda coords en lat y lng
                window.lng = position.coords.longitude;
                // alert(lat, lng);
            },
            error: function(error) { alert('Geolocalización falla: '+error.message); },
            not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
        });
    }
    else alert('GMaps not working');

    // EVENTOS
    $('.icon-menu').on('click', function(evt) {
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
        if (delta < 400) {
            return;
        }
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
                    if (result.cancelled) {
                        return;
                    }
                    var splittedText = result.text.split('/');
                    if (splittedText[2] !== 'www.pointeres.es') {
                        alert('Código QR inválido 2');
                    }
                    else if (splittedText[3] === 'teulada') {
                        if (splittedText[4] === 'iglesia') {
                            if (checkConnection()) {
                                // videoPlayer = window.open('http://www.youtube.com/embed/gAdOFQaP66A?list=UUvdmEDFj2FtEdyaOW8zSjIA', '_self', 'location=no');
                                /*videoPlayer = true;
                                $('#videoPlayer').removeClass('right').addClass('center');
                                $('#principal').removeClass('center').addClass('left');
                                $('#videoPlayer > .content').html('<iframe width="100%" src="http://www.youtube.com/embed/u6RFyVN9sNg#autoplay=1" frameborder="0" allowfullscreen></iframe>');*/
                                cordova.plugins.videoPlayer.play('https://www.youtube.com/watch?v=9NDMq94lLGY');
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
            /*videoPlayer = true;
            $('#videoPlayer').removeClass('right').addClass('center');
            $('#' + whereiam).removeClass('center').addClass('left');
            $('#videoPlayer > .content').html('<iframe width="100%" src="http://www.youtube.com/embed/u6RFyVN9sNg#autoplay=1" frameborder="0" allowfullscreen></iframe><br><button onclick="window.plugins.socialsharing.share(\'Message only\')">Share</button><br><button onclick="window.plugins.socialsharing.canShareVia(\'whatsapp\', \'msg\', null, null, null, function(e){alert(\'si\')}, function(e){alert(e)})">is WhatsApp available?</button><br><button onclick="window.plugins.socialsharing.canShareVia(\'mms\', \'msg\', null, null, null, function(e){alert(\'si\')}, function(e){alert(e)})">is SMS available?</button>');*/
            cordova.plugins.videoPlayer.play('https://www.youtube.com/watch?v=9NDMq94lLGY');
        }
    });
    $('#video_castell').on('tap', function() {
        if (checkConnection()) {
            cordova.plugins.videoPlayer.play('https://www.youtube.com/watch?v=IE_Z_0-zOY4');
        }
    });
    $('#video_fontsanta').on('tap', function() {
        if (checkConnection()) {
            cordova.plugins.videoPlayer.play('https://www.youtube.com/watch?v=rC7Wm57H3Dg');
        }
    });
    $('#mapa_teulada').on('tap', function(evt) {
        $('#map').removeClass('right').addClass('center');
        $('#' + whereiam).removeClass('center').addClass('left');
        map = true;

        // alert('test');
        
        if (GMaps) {
            map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
              el: '#mapplace',
              lat: window.lat,
              lng: window.lng
            });
            map.addMarker({ 'lat': window.lat, 'lng': window.lng });  // marcador en [lat, lng]
        }
    });

    $('#check_conn').on('tap', checkConnection);

    $('#menu li[data-menu=idioma]').on('tap', function(e) { // !!!
        if (storage.lang == 0) {
            changeLang('es');
        }
        else {
            changeLang('en');
        }
        volverAtras();
    })
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

            $('#principal').removeClass('center').addClass('right');
            $('#menu').removeClass('left').addClass('center');

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

/* STATS */
storage = window.localStorage;
// alert('Identificado con: '+ storage.getItem('id'));
if (!storage.getItem('id')) {
    storage.setItem('id', 17);
    var opStats = [];
    storage.setItem('opened', JSON.stringify(opStats));
}

var opStats = opStats || JSON.parse(storage.getItem('opened'));
opStats.push(+new Date());
storage.setItem('opened', JSON.stringify(opStats));


if (!storage.lang) { // first time app is opened
    var lang = window.navigator.language.split('-')[0];
    changeLang (lang);
    var platform = 'android'; // add platform information and ask for an id.
}

function changeLang(lang) {
    var arr = ['en', 'es']
    var pos = arr.indexOf(lang);
    if (pos === -1) {
        storage.lang = 0;
    }
    else if (pos !== db.lang) {
        storage.lang = pos;
    }
    // storage.lang = window.db.lang;
    rechargeLang();
}

function rechargeLang() {
    window.text = db.translation[storage.lang].text;
    $('li[data-menu=scan]').contents().last()[0].textContent=(window.text[0]);
    $('li[data-menu=poi]').contents().last()[0].textContent=(window.text[1]);
    $('li[data-menu=maps]').contents().last()[0].textContent=(window.text[2]);
    $('li[data-menu=rutea]').contents().last()[0].textContent=(window.text[3]);
}
