var debug = {};

var app = {
  // Application Constructor
  initialize: function() {
    app.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
    // document.addEventListener('backbutton', app.onBackButton, false);
    // document.addEventListener('menubutton', app.onMenuButton, false);
    document.addEventListener('error', function(e) {
      console.error('Error! ' + e);
    });
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function(e) {
    document.addEventListener('backbutton', app.onBackButton, false);
    document.addEventListener('menubutton', app.onMenuButton, false);

    app.loadConfig();
    app.setUptimer(db.timer); // default 10secs
    app.server = 'http://' + app.domain + ':3000';

    app.attachEvents();

    if (!app.hasId()) {
      app.getId();
    }
    app.sendHello();

    app.getGeoLocation();
  },
  onBackButton: function(e) {
    // console.log('onBackButton');
    var whereIWas = app.whereIAm.pop();
    if (!whereIWas) {
      // console.log('whereIWas: ' + whereIWas + '\nwhereIAm: ' + app.whereIAm);
      navigator.app.exitApp();
    }
    var going = app.whereIAm[app.whereIAm.length - 1] || 'principal';

    if (whereIWas === 'popup') {
      $('#popup').removeClass('popup-show');
    }
    else if (whereIWas === 'menu') {
      $('#' + whereIWas).removeClass('center').addClass('left');
      $('#' + going).removeClass('right').addClass('center');
    }
    else {
      $('#' + whereIWas).removeClass('center').addClass('right');
      $('#' + going).removeClass('left').addClass('center');
    }
  },
  onMenuButton: function(e) {
    // console.log('onMenuButton');
    if (app.whereIAm.length === 0) {
      $('#principal').removeClass('center').addClass('right');
      $('#menu').removeClass('left').addClass('center');
      app.whereIAm.push('menu');
    }
    else if (app.whereIAm[app.whereIAm.length - 1] === 'menu') {
      app.onBackButton();
    }
  },
  // Update DOM on a Received Event
  // receivedEvent: function(id) {

  // },
  hasConnection: function() {
    var netState = navigator.connection && navigator.connection.type;
    var states = {
      'Connection.UNKNOWN':'Unknown connection',
      'Connection.NONE': 'No network connection'
    };

    if (netState in states) {
      return false;
    }
    return true;
  },
  hasId: function() {
    return !!localStorage.getItem('id');
  },
  getId: function() {
    if (!app.hasConnection()) {
      return false;
    }
    $.ajax({
      type: 'POST',
      url: app.server + '/hello',
      data: {
        "platform": cordova.platformId,
        "lang" : db.translationLocales[app.config.lang]
      },
      dataType: 'json',
      success: function(data, status, xhr) {
        if (debug) {
          debug.helloResponse = {
            data: data,
            status: status,
            xhr: xhr
          };
        }
        localStorage.setItem('id', data.id);
        app.id = data.id;
      },
      error: function(xhr, errorType, error) {
        if (debug) {
          debug.helloResponse = {
            xhr: xhr,
            errorType: errorType,
            error: error
          };
        }
      }
    });
  },
  sendHello: function() {
    if (debug) {
      debug.sendHello = {
        id: app.id,
        saved: app.saved
      };
    }
    if (!app.hasConnection()) {
      return app.saveInfo('open', app.uptime);
    }
    $.ajax({
      type: 'POST',
      url: app.server + '/open',
      data: {
        id: app.id,
        lang: db.translationLocales[app.config.lang],
        uptime: app.uptime,
        saved: localStorage.getItem('saved')
      },
      dataType: 'json',
      success: function(data, status, xhr) {
        if (debug) {
          debug.openResponse = {
            data: data,
            status: status,
            xhr: xhr
          };
        }
        if (data.msg === 'Ok') {
          app.clearSaved();
        }
      },
      error: function(xhr, errorType, error) {
        if (debug) {
          debug.openResponse = {
            xhr: xhr,
            errorType: errorType,
            error: error
          };
        }
        var err = JSON.parse(xhr.responseText).error;
        if (err === 'user not found') {
          app.getId();
        }
        app.saveInfo('open', app.uptime);
      }
    });
  },
  sendClick: function(data) {
    if (debug) {
      debug.sendClick = {
        hasConnection: app.hasConnection(),
        data: data
      };
    }
    if (!app.hasConnection()) {
      return saveInfo('click', data);
    }
    $.ajax({
      type: 'POST',
      url: app.server + '/click',
      data: {
        id: app.id,
        lang: db.translationLocales[app.config.lang],
        info : data
      },
      dataType: 'json',
      success: function(data, status, xhr) {
        if (debug) {
          debug.clickResponse = {
            data: data,
            status: status,
            xhr: xhr
          };
        }
      },
      error: function(xhr, errorType, error) {
        if (debug) {
          debug.helloResponse = {
            xhr: xhr,
            errorType: errorType,
            error: error
          };
        }
        app.saveInfo('click', data);
      }
    });
  },
  saveInfo: function(from, data) {
    app.saved.push({
      from: from,
      timestamp: +new Date(),
      data: data
    });
    localStorage.setItem('saved', JSON.stringify(app.saved));
  },
  clearSaved: function() {
    app.saved = [];
    localStorage.setItem('saved', '');
  },
  changeLang: function(lang) {
    var pos = db.translationLocales.indexOf(lang);
    if (pos === -1) {
      app.config.lang = 0; // default English
    }
    else {
      app.config.lang = pos;
    }
    localStorage.setItem('lang', app.config.lang);
    app.rechargeLang();
  },
  rechargeLang: function() {
    app.translation = db.translation[app.config.lang];
    
    $('#menu li').each(function(index, item) {
        $(item).contents().last()[0].textContent = app.translation.menu[index];
    });
    $('#principal li').each(function(index, item) {
        $(item).contents().last()[0].textContent = app.translation.principal[index];
    });
  },
  getGeoLocation: function() {
    if (app.config.gps) {
      navigator.geolocation.getCurrentPosition( // GPS
        function(position) {
          app.coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          if (debug) {
            debug.coords = position.coords;
          }
          console.log('(GPS) lat: ' + app.coords.lat + '\tlng: ' + app.coords.lng);
        },
        function(error) {
          console.error('code: ' + error.code + '\n' + 'message: ' + error.message);
        },
        {
          maximumAge: 10 * 60 * 1000,
          timeout: 3 * 60 * 1000,
          enableHighAccuracy: true
        }
      );
    }
   navigator.geolocation.getCurrentPosition( // NETWORK
      function(position) {
        app.coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if (debug) {
          debug.coords = position.coords;
        }
        console.log('(NET) lat: ' + app.coords.lat + '\tlng: ' + app.coords.lng);
      },
      function(error) {
        console.error('code: ' + error.code + '\n' + 'message: ' + error.message);
      }
    );
  },
  loadConfig: function() {
    //load config from localStorage
    if (!app.config) { //default settings
      app.config = {
        gps: true
      };
    }

    app.config.lang = localStorage.getItem('lang') || navigator.language.split('-')[1];
    app.config.lang = Math.abs(db.translationLocales.indexOf(app.config.lang));
    app.id = localStorage.getItem('id');
    app.uptime = +localStorage.getItem('uptime');
    app.saved = JSON.parse(localStorage.getItem('saved')) || [];

    app.rechargeLang();
  },
  setUptimer: function(time) {
    app.timer = setInterval(function() {
      app.uptime += +time;
      localStorage.setItem('uptime', app.uptime);
    }, time * 1000);
  },
  captureQr: function() {
    cordova.plugins.barcodeScanner.scan(function(result) {
      if (debug) {
        debug.qrScan = result;
      }
      if (result.cancelled) {
        return app.errcode.QRCANCEL;
      }
      var link = app.getQrLink(result.text);
      if (!link) {
        return app.errcode.QRBAD;
      }
      if (!app.hasConnection()) {
        return app.errcode.NOCONNECTION;
      }
      app.playVideo(link);
    });
  },
  getQrLink: function(text) {
    var spltd = text.split('/');
    if (spltd[2] !== 'www.pointeres.es') { // !!! app.domain
      return false;
    }
    if (!(spltd[3] in db.qrLinks && spltd[4] in db.qrLinks[spltd[3]])) {
      return false;
    }
    return db.qrLinks[spltd[3]][spltd[4]];
  },
  playVideo: function(link) {
    var link = link[app.config.lang];
    // alert('playing video ' + link);
    cordova.plugins.videoPlayer.play(link);
  },
  showMap: function(mapName) {
    if (!app.hasConnection()) {
      if (debug) {
        console.error('no connection from showMap');
      }
      return app.errcode.NOCONNECTION;
    }
    else if (!GMaps) {
      if (debug) {
        console.error('no GMaps from showMap');
      }
      return app.errcode.NOGMAPS;
    }
    var mapInfo = app.getMapInfo(mapName);
    // console.log(app.lastMapInfo);
    // console.log(mapInfo);
    // console.log(app.lastMapInfoLang);
    // console.log(app.config.lang);
    if (!mapInfo) {
      if (debug) {
        debug.mapName = mapName;
        debug.mapInfo = mapInfo;
        console.error('no mapinfo found');
      }
      return app.errcode.NOMAPINFO;
    }
    if (!app.map) { // create new map
      app.map = new GMaps({
        div: '#mapplace',
        lat: mapInfo.lat || app.coords.lat,
        lng: mapInfo.lng || app.coords.lng,
        zoom: mapInfo.zoom || 15,
        disableDefaultUI: true,
        styles: [
        { 
          "featureType": "poi.place_of_worship",
          "stylers": [ { "visibility": "off" } ]
        },
        { 
          "featureType": "poi.business",
          "stylers": [ { "visibility": "off" } ] 
        }
        ]
      });
      app.lastMapInfoLang = app.config.lang;
      // app.lastMapInfo = mapInfo;
      // var markers = app.getMapMarkers(mapInfo.markers);
      // console.log(mapInfo.markers);
      // console.log(markers);
      var markers = app.getAllMapMarkers();
      app.map.addMarkers(markers);
    }
    else {
      if (app.lastMapInfoLang !== app.config.lang) { // change lang of markers
        // console.log('lang change maps');
        app.lastMapInfoLang = app.config.lang;
        var markers = app.getAllMapMarkers();
        // console.log(markers);
        app.map.removeMarkers();
        app.map.addMarkers(markers);
      }
      if (mapInfo !== app.lastMapInfo) { // move center (and zoom) of the map
        // console.log('move center of the map');
        // console.log(app.map);
        app.map.panTo({lat: mapInfo.lat, lng: mapInfo.lng });
        // app.map.setCenter(mapInfo.lat, mapInfo.lng);
        app.map.setZoom(mapInfo.zoom);
      }
    }
    // console.log('last: '+ app.lastMapInfo);
    // console.log('now : '+ mapInfo);
    console.log(app.map);
    app.lastMapInfo = mapInfo;

    $('#map').removeClass('right').addClass('center');
    $('#' + app.whereIAm[app.whereIAm.length - 1]).removeClass('center').addClass('left');
    app.whereIAm.push('map');
  },
  getMapInfo: function(mapName) {
    return db.mapInfo && db.mapInfo[mapName];
  },
  getMapMarkers: function(markers) {
    // console.log(markers.length);
    // console.log(markers);
    var tMarkers = [];
    for (var i = 0; i < markers.length; i++) {
      tMarkers.push({
        lat: markers[i].lat,
        lng: markers[i].lng,
        title: markers[i].title,
        infoWindow: {
          content: db.translation[app.config.lang].maps[markers[i].id]
        },
        icon: markers[i].icon
      })
    }
    return tMarkers;
  },
  getAllMapMarkers: function() {
    // console.log(db.mapInfo);
    var tMarkers = [];
    for (var mapInfo in db.mapInfo) {
      markers = db.mapInfo[mapInfo].markers;
      for (var i = 0; i < markers.length; i++) {
        tMarkers.push({
          lat: markers[i].lat,
          lng: markers[i].lng,
          title: markers[i].title,
          infoWindow: {
            content: app.setMapContent(markers[i].id)
          },
          icon: markers[i].icon
        })
      }
    }
    return tMarkers;
  },
  setMapContent: function(id) {
    var content = app.translation.maps[id];
    var links = '';
    if (content.video) {
      links += '<ul><li data-menu="' + content.video + '">Ver Video</li></ul>';
    }
    return '<h3>' + content.text + '</h3>' + links;
  },
  attachEvents: function() {
    $('#mapplace').on('tap', 'li', function(e) {
      return $('#video_iglesia').trigger('tap');
    });
    $('li').on('tap', function(e) {
      var data = $(this).attr('data-menu') || $(this).attr('id') || $(this).parent().attr('id');

      app.sendClick(data);
      
      if (app.whereIAm.length === 0) {
        if (data === 'scan') {
          return app.captureQr();
        }
        app.whereIAm.push(data);
        $('#principal').removeClass('center').addClass('left');
        $('#' + data).removeClass('right').addClass('center');
      }
      else {
        spltd = data.split('_');
        if (spltd[0] === 'video') {
          var link = db.qrLinks.teulada[spltd[1]];
          if (link) {
            app.playVideo(link);
          }
          else {
            console.error('video no encontrado\ndata: ' + data);
          }
        }
        else if (spltd[0] === 'mapa') {
          app.showMap(spltd[1]);
        }
        else if (data === 'idioma') {
          $('#popup').addClass('popup-show');
          app.whereIAm.push('popup');
        }
        else if (data === 'popup') {
          app.onBackButton();
        }
        else if (data.indexOf('lang') === 0) {
          e.stopPropagation();
          app.changeLang(data.substr(5,2));
          app.onBackButton();
        }
        else if (data === 'config') {
          alert(window.devicePixelRatio);
        }
      }
    });
    $('#popup').on('tap', function(e) {
      app.onBackButton();
    });
    $('.icon-menu').on('tap', function(e) {
      app.onMenuButton();
    });
    $('.boton-atras').on('tap', function(e) {
      app.onBackButton();
    });
  },
  errcode: {
    NOCONNECTION: 11,
    QRCANCEL: 21,
    QRBAD: 22,
    NOGMAPS: 31,
    NOMAPINFO: 32
  },
  domain: 'd2bit.net',
  // domain: 'www.pointeres.es',
  // domain: '192.168.1.168',
  // server: 'http://' + app.domain + ':3000',
  whereIAm: [],
  config: {}
};

app.initialize();