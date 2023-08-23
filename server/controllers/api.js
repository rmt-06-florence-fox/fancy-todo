const axios = require('axios')

class ApiController {
    static async weatherToday (req, res, next) {
        const lat = req.headers.latitude || "-6.21462"
        const lon = req.headers.longitude || "106.84513"
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER}`
        console.log(url, ' url')
        try {
            const result = await axios({
                method: 'GET',
                url
            })
            console.log(result.data, ' result')
            res.status(200).json(result.data)
        } catch (error) {
            console.log(error, ' error')
            next(error)    
        }
    }
}

module.exports = ApiController