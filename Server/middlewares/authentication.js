const {verifyToken} = require('../helpers/jsonwebtoken');
const {User} = require('../models');

module.exports = async (req, res, next) =>{
    try {
        const {access_token} = req.headers;
        if(!access_token){
            res.status(401).json({
                message: 'You need to login to have an access'
            })
        } else {
            const decode = verifyToken(access_token);
            req.loggedIn = decode;
            const foundUser = await User.findOne({where: {id: decode.id}})
            if(foundUser){
                next()
            } else {
                res.status(401).json({
                    message: 'You need to login to have an access'
                })
            }
        }
    } catch {
        res.status(401).json({
            message: 'Jangan nakal kamu'
        })
    }
}