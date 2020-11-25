const { User } = require("../models")
const { verifyToken } = require("../helper/jwt")

module.exports = async (req, res, next) => {
    try {
        console.log("test udah masuk auth");
        const { access_token } = req.headers
        if (!access_token) {
            throw {
                status: 401,
                message: "Please Login or Register First"
            }
        } else {
            const decode = verifyToken(access_token)
            req.loggedInUser = decode
            const user = await User.findOne({ where: { 
                id: decode.id
            }})
            if (user) {
                next()
            } else {
                throw {
                    status: 401,
                    message: "Please Login or Register First"
                }
            }
        }
    } catch (err) {
        next(err)
    }
}