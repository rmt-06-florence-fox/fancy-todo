const axios = require('axios')

class ThirdPartyApi{
    static async getWeather(req, res, next){
        try {
            const response = await axios.get('https://www.metaweather.com/api/location/1047378/');   
            res.status(200).json(response.data.consolidated_weather)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = ThirdPartyApi