const axios = require('axios');

class SholluController {
    static async getSchedule(req, res, next) {
        const date = (new Date()).toISOString().split('')
        let today = ''
        for (let i = 0; i < 10; i++) { today += date[i] }
        try {
            let response = await axios({
                url: `https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/${today}`,
                method: 'GET',
                responseType: 'json'
            })
            // console.log(response.data.jadwal.data)
            res.status(200).json(response.data.jadwal.data)
        } catch (err) {
            next(err)
        }

    }
}
module.exports = SholluController