const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        console.log("udah msk auth")
        const { access_token } = req.headers
        if (!access_token) {
            res,status(401).json({ message: "Please login first" })
        } else {
            const decoded = verifyToken(access_token)
            req.signInUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) {
                next()
            } else {
                res.status(401).json({ message: "Please login first" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Please login first" })
    }
}