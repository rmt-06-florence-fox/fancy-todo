const axios = require("axios");

class ThirdPartyController {
    static async getWeather(req, res, next) {
        try {
            let latitude = req.body.latitude;
            let longitude = req.body.longitude;
            const response = await axios({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${process.env.OWM_KEY}&units=metric`,
                method: "GET"
            });
            console.log(response);
            res.status(200).json(response.data);
        } catch (err) {
            next(err);
        }
    }

    static async getQuotes(req, res, next) {
        try {
            const response = await axios({
                url: `https://quote-garden.herokuapp.com/api/v2/quotes/random`,
                method: "GET"
            });
            console.log(response);
            res.status(200).json(response.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ThirdPartyController;