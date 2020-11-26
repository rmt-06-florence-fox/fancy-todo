const axios = require("axios");

class calendarificController {
  static show(req, res, next) {
    axios({
      method: `GET`,
      url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_SECRET}&country=ID&year=2020`,
    })
      .then((result) => {
        // console.log(result.data.response.holidays);
        res.status(200).json(result.data.response.holidays);
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = calendarificController;
