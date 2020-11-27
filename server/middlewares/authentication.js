const { User } = require('../models')
const { verifyToken } = require('../helper/jwt')

module.exports = async (req, res, next) => {
    try {
        // console.log("udah msk authen")
        const { access_token } = req.headers
        if (!access_token) {
            throw {
                status: 401,
                message: "Please login first"
            }
        } else {
            const decoded = verifyToken(access_token)
            // console.log(decoded);
            req.signInUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) {
                console.log("masuk bos")
                next()
            } else {
                throw {
                    status: 401,
                    message: "Please login first"
                }
            }
        }
    } catch (err) {
        next(err)
    }
}