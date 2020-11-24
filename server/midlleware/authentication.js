const {verifyToken} = require('../helper/jwt')
const {User} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if (!access_token) {
            res.status(401).json({"msg" : "please login first!"})
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
                res.status(401).json({
                    "msg": "please login first!"
                })
            }
        }
    } catch (error) {
        res.status(400).json({"msg" : "please login first!"})
    }
}