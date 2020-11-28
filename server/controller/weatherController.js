const axios = require('axios')

class WeatherController {
    static weather(req, res, next){
        axios({
            url: "https://www.metaweather.com/api/location/1047378",
            method: 'GET'
        })
        .then(response => {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = WeatherController