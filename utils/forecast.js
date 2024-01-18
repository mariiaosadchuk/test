import request from 'postman-request';

const baseUrl = 'http://api.weatherstack.com/'

const query = 'current?access_key=19f58af393e9cf42597ef7466497b5e6&query='

const forecast = ({ latitude, longitude, address }, callback) => {
  const composedUrl = `${baseUrl}${query}${latitude},${longitude}`

  request({ url: composedUrl, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the server!')
    } else if (body.error){
      callback('No matching result for your location :(')
    } else {
      const currentWeather = body.current
      const output = `Forecast for ${address}: It is currently ${currentWeather.temperature} degrees out. ${currentWeather.weather_descriptions[0]}, feels like ${currentWeather.feelslike} degree.`
      callback(undefined, output)
    }
  })
}

export { forecast }
