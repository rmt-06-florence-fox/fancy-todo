const axios = require('axios');

class ControllerApi {
    static showApi(req, res, next) {
        axios.get('https://indonesia-covid-19.mathdro.id/api/')
            .then(function ({ data }) {
                const result = {
                    perawatan: data.perawatan,
                    sembuh: data.sembuh,
                    meninggal: data.meninggal,
                    jumlahKasus: data.jumlahKasus,
                    lastUpdate: data.lastUpdate
                }
                res.status(200).json(result)
            })
            .catch(function (error) {
                next(error)
                // res.status(500).json(error)
            })

    }
}

module.exports = ControllerApi