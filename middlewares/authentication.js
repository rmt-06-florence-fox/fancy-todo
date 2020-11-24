const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models')


module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw({message: "Please Login First"})
        } else {
            const decoded = verifyToken(access_token, process.env.SECRET)
            req.loggedInUser = decoded
            const user = await User.findOne({where:{id: decoded.id}})
            if(user){
                next()
            } else {
                throw({message: "Please Login First"})
            }
        }
    } catch (error) {
        if(error.message == 'Please Login First'){
            res.status(401).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}