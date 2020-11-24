const { User } = require('../../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try{
        const { access_token } = req.headers
        if (!access_token) {
            res.status(401).json({
                message: 'Login required'
            })
        } else {
            const decoded = verifyToken(access_token)
            // console.log(decoded);
            req.loggedInUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            // console.log(user);
            if (user) {
                next();
            } else {
                res.status(401).json({
                    message: 'You have not registered yet!'
                })   
            }
        }
    }
    catch(err) {
        console.log(err);
        res.status(401).json({
            message: 'Login required'
        })
    }
}