const axios = require("axios");

class calendarificController {
//   static show(req, res, next) {
//     axios({
//       method: `GET`,
//       url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_SECRET}&country=ID&year=2020`,
//     })
//       .then((result) => {
//         // console.log(result.data.response.holidays);
//         res.status(200).json(result.data.response.holidays);
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
  static async show(req, res, next) {
      try {
          const result = await axios({
            method: `GET`,
            url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_SECRET}&country=ID&year=2020`,
          })
          res.status(200).json(result.data.response.holidays)
      } catch (error) {
          next(error)
      }
  }
}
module.exports = calendarificController;
