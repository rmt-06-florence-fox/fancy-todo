const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            res.status(401).json({
                message: "Please login first"
            }) 
        }
        else {
            const decoded = verifyToken(access_token)
            req.loggedInUser = decoded
            const user = await User.findOne({
                where : {
                    id: decoded.id
                }
            })
            if (user) {
                next()
            }
            else {
                res.status(401).json({
                    message: 'please login first'
                })
            }
        }
    }
    catch (err) {
        res.status(401).json({
            message: "Please login first"
        })
        console.log(err)
    }
}