const axios = require("axios");

class WeatherController {
    static async getWeather(req, res, next) {
        try {
            let lat = -0.051706;
            let lon = 109.345229;
            const response = await axios({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.OWM_KEY}&units=metric`,
                method: "GET"
            });
            console.log(response.data);
            res.json(response.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = WeatherController;