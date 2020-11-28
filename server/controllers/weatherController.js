const axios = require('axios')

class WeatherController {
  static getWeatherJakarta (req, res, next) {
    let weather

  axios({
    url: 'http://api.weatherstack.com/current',
    method: 'get',
    params: {
      access_key: process.env.WEATHER_KEY,
      query: 'Jakarta'
    }
  })
  .then(weather => {
    weather = {
      query: weather.data.request.query,
      temperature: weather.data.current.temperature,
      description: weather.data.current.weather_descriptions[0],
      name: weather.data.location.name
    }
    res.status(200).json(weather)
  })
  .catch(err => {
    next(err)
  })
}
}

module.exports = WeatherController