const axios = require("axios")

class apiController {
  static favqs(req, res, next){
    axios({
      url: "https://favqs.com/api/qotd",
      method: "GET"
    })
      .then(response => {
        res.status(200).json({
          quotes: response.data.quote.body,
          author: response.data.quote.author
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = apiController