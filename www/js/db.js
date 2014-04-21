var db = {
	server: 'http://192.168.1.168:3000',
	timer: 10, // in seconds
	translationLocales: ['en', 'es'],
	translation: [
	{
		name: 'English',
	    locale: 'en',
	    menu: [
	    'Pointeres',
	    'Pointeres Cities',
	    'Language',
	    'Sign up',
	    'Settings',
	    'Terms and Conds'
	    ],
	    principal: [
		'Scan QR Code',
		'Points of interest',
		'Maps',
		'Routing',
		'Leisure activities',
		'Eating',
		'Shopping'
		],
		maps: {
			m1: 'Moraira Castle',
			m2: 'Portet Beach',
			m3: 'Andrago Beach',
			m4: 'Fish market',
			t1: 'St Catherine\'s Church',
			t2: 'TM Auditorium',
			t3: '6th Cent Square'
		}
	},
	{
		name: 'Español',
	    locale: 'es',
	    menu: [
	    'Pointeres',
	    'Ciudades Pointeres',
	    'Idioma',
	    'Registrate',
	    'Configuración',
	    'Condiciones de uso'
	    ],
	    principal: [
		'Captura código QR',
		'Puntos de interés',
		'Mapas',
		'Rutea',
		'Actividades y ocio',
		'Gastro',
		'Compras'
		],
		maps: {
			m1: 'Castillo Moraira',
			m2: 'Playa Portet',
			m3: 'Playa Andragó',
			m4: 'Lonja pescado',
			t1: 'Iglesia Snta. Catelina',
			t2: 'Auditorio TM',
			t3: 'Plaza 6o Centenario'
		}
	}
	],
	qrLinks: {
		teulada: {
			iglesia: 'https://www.youtube.com/watch?v=9NDMq94lLGY',
			fontsanta: 'https://www.youtube.com/watch?v=rC7Wm57H3Dg',
			castell: 'https://www.youtube.com/watch?v=IE_Z_0-zOY4'
		}
	},
	mapInfo: {
		teulada: {
			lat: 38.728895,
			lng:  0.104046,
			zoom: 15,
			markers: [
			{
				id: 't1',
				lat: 38.729395,
				lng:  0.102318,
				title: 'Iglesia Snta Caterina',
				infoWindow: {
					content: '<p>IGLESIA</p>'
				},
				icon: 'img/marker_icon.png'
			},
			{
				id: 't2',
				lat: 38.729270,
				lng:  0.109472,
				title: 'Auditori TM',
				infoWindow: {
					content: '<p>AUDITORI</p>'
				},
				icon: 'img/marker_icon.png'
			},
			{
				id: 't3',
				lat: 38.727853,
				lng:  0.103623,
				title: 'Plaça 6e cent',
				infoWindow: {
					content: '<p>PLAÇA 6e CENT</p>'
				},
				icon: 'img/marker_icon.png'
			}
			]
		},
		moraira: {
			lat: 38.687620,
			lng:  0.137368,
			zoom: 14,
			markers: [
			{
				id: 'm1',
				lat: 38.686791,
				lng:  0.132637,
				title: 'Castell Moraira',
				infoWindow: {
					content: 'CASTELL'
				},
				icon: 'img/marker_icon.png'
			},
			{
				id: 'm2',
				lat: 38.687666,
				lng:  0.146357,
				title: 'Platja Portet',
				infoWindow: {
					content: 'PORTET'
				},
				icon: 'img/marker_icon.png'
			},
			{
				id: 'm3',
				lat: 38.681862,
				lng:  0.120838,
				title: 'Platja Andragó',
				infoWindow: {
					content: 'ANDRAGO'
				},
				icon: 'img/marker_icon.png'
			},
			{
				id: 'm4',
				lat: 38.686764,
				lng:  0.134767,
				title: 'Llotja Peix',
				infoWindow: {
					content: 'LLOTJA'
				},
				icon: 'img/marker_icon.png'
			}
			]
		}
	}
}