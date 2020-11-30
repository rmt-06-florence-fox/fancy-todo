const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const {accesstoken} = req.headers
        if(!accesstoken) {
            throw {
                status: 401,
                message: "Please Login First"
            }
        } else {
            const decoded = verifyToken(accesstoken)
            req.loggedInUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if(user) {
                next()
            } else {
                throw {
                    status: 401,
                    message: "Please Login First"
                }
            }
        }
    } catch (err) {
        next(err)
    }
}