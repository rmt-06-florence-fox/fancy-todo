const { verifyToken } = require('../helpers')
const { User } = require('../models')
async function authentication (req, res, next){
    const {access_token} = req.headers
    try {
        if(!access_token){
            throw {
                status: 401,
                message: 'Please login first'
            }
        }
        else{
            const decoded = verifyToken(access_token)
            // console.log(decoded)
            req.loggedInUser = decoded
            const user = await User.findOne({where: {id: decoded.id}})
            if(user){
                next()
            }
            else{
                throw {
                    status: 401,
                    message: 'Please login first'
                }
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;