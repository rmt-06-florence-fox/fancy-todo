const axios = require('axios')

class ThirdParty {
    static sholatTime(req, res, next) {
        axios({
            method: 'get',
            url: 'https://aladhan.p.rapidapi.com/timingsByCity?city=Jakarta&country=IDN',
            headers: {
                "x-rapidapi-key": "7ab1090395mshf51797c69b4c08fp137c20jsn1c468c04e70e",
                "x-rapidapi-host": "aladhan.p.rapidapi.com"
            },
            params: {
                city: 'Jakarta',
                country: "Indonesia"
            }
        })
        .then(response => {
            let prayerTime = response.data.data.timings
            res.status(200).json(prayerTime)
            
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = ThirdParty