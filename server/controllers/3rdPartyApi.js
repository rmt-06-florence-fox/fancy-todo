const axios = require('axios')

class thirdPartyApi {
  static getQoute(req, res, next) {
    axios({
      url: 'https://favqs.com/api/qotd',
      method: 'GET'
    })
    .then(result => {
      let qotd = result.data.quote.body
      let author = result.data.quote.author
      res.status(200).json({qotd, author})
    })
    .catch(err => {
      console.log(err.message)
    })
  }
}

module.exports = thirdPartyApi