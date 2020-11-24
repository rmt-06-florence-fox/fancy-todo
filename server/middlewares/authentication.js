const { verifyToken } = require("../helper/jwt");
const {User} = require('../models')

function authentication(req, res, next){
    console.log('lewat authentik');
    // console.log(req.headers);
    const access_token = req.headers.access_token
    if(!access_token){
        throw{
            status:401,
            message: 'Please log in first'
        }
        // res.status(401).json({msg: 'Please log in first'})
    } else {
        const decoded = verifyToken(access_token)
        req.userLogIn = decoded
        User.findByPk(decoded.id)
            .then(user => {
                if (user){
                    next()
                } else {
                    throw{
                        status: 401,
                        message: 'You dont have account, please register'
                    }
                    // res.status(401).json({msg: 'You dont have account, please register'})
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = authentication