const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.token
        if(!token){
            res.status(401).json({msg: 'please login first'})
        } else {
            const decoded = verifyToken(token)
            req.loggedInUser = decoded
            const user = await User.findByPk(decoded.id)
            
            if(user){
                next()
            }else {
                res.status(401).json({msg: 'please login first'})                
            }
        }
    } catch(error) {
        res.status(401).json({msg: 'please login first'})
    }
}