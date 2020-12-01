const axios = require('axios')


class ApiController {

    static async exchangeAPI(req,res,next){
        console.log('============= Get exchange=============')
        try {
            const exchangeData = await axios({
                method : 'get',
                url : `https://v6.exchangerate-api.com/v6/${process.env.exchange_rate_key}/latest/USD`
            })
            console.log(exchangeData)
            res.status(200).json(exchangeData.data)
        } catch (error) {
            next(error)
        }
    }

    static async locationAPI(req,res,next){
        console.log('================= Finding Your Location=======')
        try {
            const location = await axios({
                method : 'get',
                url : 'http://ip-api.com/json/'
            })
            console.log('=========== Get you Location==========')
            console.log(location)
            res.status(200).json(location.data)
        } catch (error) {
            next(error)
        }
    }

    static async weatherApi (req,res,next){
        console.log('=========== Try to Get weather=========')
        try {
            console.log('======== Find The location======')
            const location =await axios({
                method : 'get',
                url : 'http://ip-api.com/json/'
            })
            
            console.log(location.data.lat)
            const latitude = location.data.lat
            const longitude = location.data.lon
            const weather = await axios({
                method: 'get',
                url : `http://api.openweathermap.org/data/2.5/weather`,
                params : {
                    lat : latitude,
                    lon : longitude,
                    appid : process.env.open_weather_key,
                    units: "metric"
                }

            })
            console.log('========== Get The Weather Data========')
            console.log(weather)
            console.log('=========DAta========')
            // console.log(weather.data.main.temp)

            const mainData = {
                weather : weather.data.weather[0].main,
                location : weather.data.name,
                temperature : weather.data.main.temp
            }
            console.log(mainData)
            res.status(200).json({
                data : mainData
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = ApiController