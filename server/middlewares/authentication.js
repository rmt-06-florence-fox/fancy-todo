const Token = require('../helpers/jsonwebtoken')
const {User} = require('../models/')

module.exports = async (req, res, next) => {
    try {
        
        const {access_token} = req.headers

        if (!access_token) {
            throw {
                status: 401,
                message: `Please Login First`
            }
        } else {
            const decoded = Token.verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            
            if (user) {
                req.loggedIn = decoded
                next()
            } else {
                
                throw {
                    status: 401,
                    message: `Please Login First`
                }
            }
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}