const axios = require('axios')

class QuoteController {
    static async getRandomQuote(req, res, next) {

        try {
            let { data } = await axios({
                url: 'https://quote-garden.herokuapp.com/api/v3/quotes/random',
                method: 'GET',
                responseType: 'json'
            })

            //console.log(response)
            res.status(200).json(data.data[0])

        } catch (err) {
            next(err)
        }

    }
}
module.exports = QuoteController