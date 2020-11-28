const axios = require('axios')

class Controllers{
    static generateQuote(req, res){
        let random = Math.floor(Math.random()*1000)
        axios({
            url: `https://type.fit/api/quotes`,
            method: 'GET'
        })
        .then(response=>{
            // console.log(response.data)
            res.status(200).json(response.data[random])
            // res.status(200).json(response)
        })
        .catch(e=>{
            console.log(e)
            res.status(500).json({message: `internal server error`})
        })
    }
}

module.exports = Controllers

// axios({
//     url: `https://www.goodreads.com/book/review_counts.json?isbns=9781430259442&key=${process.env.SECRETKEY}`,
//     method: 'GET'
// })