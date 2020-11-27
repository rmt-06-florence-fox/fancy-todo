const axios = require('axios')

// class WeatherController {
//     static getWeatherJakarta (req, res, next) {
//       let weather
  
//     axios({
//       url: 'https://api.openweathermap.org/data/2.5/weather?q=jakarta',
//       method: 'get',
//       params: {
//         appid: '5264bb3939f4fe0d5a13e32cb2ecef34'
//       }
//     })
  
//     .then(weather => {
//       weather = {
//         main: weather.data.weather[0].main,
//         description: weather.data.weather[0].description,
//         temp: Math.round(weather.data.main.temp) / 10,
//         country: weather.data.sys.country,
//         name: weather.data.name,
//       }
      
//       res.status(200).json({weather})
//     })
//     .catch(err => {
//       next(err)
//     })
//   }


class WeatherController {
  static getWeatherJakarta (req, res, next) {
    let weather

  axios({
    url: 'http://api.weatherstack.com/current',
    method: 'get',
    params: {
      access_key: '10e1b95b602029bfdedcbb2787a21d99',
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