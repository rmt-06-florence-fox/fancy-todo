const {User} = require('../models')
const Helper  = require('../helper')

module.exports = function (req, res, next){
    console.log('doing authentication')
    const {token} = req.headers
    console.log(req.headers)
    
     if (token){
        const decoded = Helper.verifyToken(token)
        //console.log(decoded, '<<<<<<<<<<< DECODED TOKEN HERRRRRE')
        const userId = +decoded.id

        User.findByPk(userId)
            .then(datum => {
                if (datum) next ()
                else throw {
                    message: 'you need to login',
                    status: 401
                } //will produce an error
            })
            .catch (err => {next(err)})

    } else {
        next ({
            message : 'you need to login',
            status : 401
        })
    }
}