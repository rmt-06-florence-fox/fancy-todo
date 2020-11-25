const axios = require('axios')

class WeatherController {
    static getWeatherJakarta (req, res, next) {
      let weather
  
    axios({
      url: 'https://api.openweathermap.org/data/2.5/weather?q=jakarta',
      method: 'get',
      params: {
        appid: '5264bb3939f4fe0d5a13e32cb2ecef34'
      }
    })
  
    .then(weather => {
      weather = {
        main: weather.data.weather[0].main,
        description: weather.data.weather[0].description,
        temp: Math.round(weather.data.main.temp) / 10,
        country: weather.data.sys.country,
        name: weather.data.name,
      }
      
      res.status(200).json({weather})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = WeatherController