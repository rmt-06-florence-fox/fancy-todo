const {verifyToken} = require('../helper/jwt')
const {User} = require('../models/index')
module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token){
            req.status(401).json({message: `You must login first`})
        } else {
            const decode = verifyToken(access_token)
            req.userLoggedIn = decode
            let data = await User.findOne({
                where: {
                    id: decode.id
                }
            })
            if(data){
                next()
            } else {
                res.status(401).json({message: `You must login first`}) 
            }
        }
    } catch (error) {
        res.status(401).json({message: `You must login first`})
    }
}

