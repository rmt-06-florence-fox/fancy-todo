const {verifyToken} = require('../helper/jwt')
const {User} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if (!access_token) {
            throw({
                status: 401,
                message: "Please Login Fisrt!"
            })
        }else {
            const decoded = verifyToken(access_token)
            req.loggedUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) next()
            else {
                throw({
                    status: 401,
                    message: "Please Login Fisrt!"
                })
            }
        }
    } catch (error) {
        // console.log(error);
        next(error)
    }
}