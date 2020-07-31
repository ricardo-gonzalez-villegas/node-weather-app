const request = require('request')

const BASE_URL = 'http://api.weatherstack.com/current'
const ACCESS_KEY = '5e9730d1fa99224350bbe6a7422f0329'
const UNIT = 'f'

const forecast = (latitude, longitude, callback) => {
	const url = `${BASE_URL}?access_key=${ACCESS_KEY}&query=${latitude},${longitude}&units=${UNIT}`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service.', undefined)
		} else if (body.error) {
			callback('Unable to find location. Please try again.', undefined)
		} else {
			const {
				weather_descriptions: weather,
				temperature,
				feelslike,
			} = body.current
			const data = `${weather}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
			callback(undefined, data)
		}
	})
}

module.exports = forecast
