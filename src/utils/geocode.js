const request = require('request')

const BASE_URL = 'https://api.mapbox.com/geocoding/v5/'
const ACCESS_TOKEN =
	'pk.eyJ1IjoicmljYXJkby1ndiIsImEiOiJja2Q3cmF4em8yMmJpMnpudWpocmprNzcwIn0.i3sFPgFyYfmR_l8XKsN8sA'

const geocode = (location, callback) => {
	const url = `${BASE_URL}mapbox.places/${encodeURIComponent(
		location
	)}.json?access_token=${ACCESS_TOKEN}&limit=1`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services.', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find location. Please try again.')
		} else {
			const { center, place_name: location } = body.features[0]
			callback(undefined, {
				latitude: center[1],
				longitude: center[0],
				location,
			})
		}
	})
}

module.exports = geocode
