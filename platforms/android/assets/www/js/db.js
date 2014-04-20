var db = {
	server: 'http://192.168.1.168:3000',
	timer: 10*1000,
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
		]
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
		]
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
			lat: 38.7274197,
			lng: 0.1057174,
			markers: [
			{
				lat: 38.7274197,
				lng: 0.1057174
			}
			]
		}
	}
}