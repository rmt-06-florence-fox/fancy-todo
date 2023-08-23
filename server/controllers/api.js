const axios = require('axios')

class ApiController {
    static async weatherToday (req, res, next) {
        let lat = "-6.21462"
        if (req.headers.latitude !== null) lat = req.headers.latitude
        let lon = "106.84513"
        if (req.headers.longitude !== null) lon = req.headers.longitude
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER}`
        console.log(url, ' url')
        try {
            const result = await axios({
                method: 'GET',
                url
            })
            res.status(200).json(result.data)
        } catch (error) {
            next(error)    
        }
    }
}

module.exports = ApiController