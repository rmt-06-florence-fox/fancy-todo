const axios = require('axios')

class QuoteController {
    static async getRandomQuote(req, res, next) {

        try {
            let response = await axios({
                url: 'https://quote-garden.herokuapp.com/api/v2/quotes/random',
                method: 'GET',
                responseType: 'json'
            })

            //console.log(response)
            res.status(200).json(response.data.quote)

        } catch (err) {
            next(err)
        }

    }
}
module.exports = QuoteController