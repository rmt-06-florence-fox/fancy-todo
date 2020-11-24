const Token = require('../helpers/jsonwebtoken')
const {User} = require('../models/')

module.exports = async (req, res, next) => {
    try {
        // console.log('cek middle ware');
        const {access_token} = req.headers
        // console.log(access_token);
        if (!access_token) {
            res.status(401).json({message: `Please Login`})
        } else {
            const decoded = Token.verifyToken(access_token)
            req.loggedIn = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            // console.log(user);
            if (user) {
                next()
            } else {
                res.status(401).json({message: `Please Login`})
            }
        }
    } catch (error) {
        res.status(401).json({message: `Please Login`})
    }
}