const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models')


module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw{
                status: 401,
                message: "Please Login First"
            }
        } else {
            const decoded = verifyToken(access_token, process.env.SECRET)
            req.loggedInUser = decoded
            const user = await User.findOne({where:{id: decoded.id}})
            if(user){
                next()
            } else {
                throw{
                    status: 401,
                    message: "Please Login First"
                }
            }
        }
    } catch (error) {
        next(error)
    }
}