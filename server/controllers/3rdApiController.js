const axios = require('axios')

class TriviaController {
    static async getTrivia(req, res, next) {
        try {
            const response = await axios({
                url: "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium",
                method: "GET",
            })
            // console.log(response.data);
            res.status(200).json(response.data) 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TriviaController