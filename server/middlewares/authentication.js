const { verifyToken } = require("../helper/jwt");
const {User} = require('../models')

function authentication(req, res, next){
    console.log('lewat authentik');
    // console.log(req.headers);
    const access_token = req.headers.access_token
    if(!access_token){
        res.status(401).json({msg: 'Please log in first'})
    } else {
        const decoded = verifyToken(access_token)
        req.userLogIn = decoded
        User.findByPk(decoded.id)
            .then(user => {
                if (user){
                    next()
                } else {
                    res.status(401).json({msg: 'You dont have account, please register'})
                }
            })
            .catch(err => {
                res.status(401).json({msg: 'Please log in first'})
            })
    }
}

module.exports = authentication