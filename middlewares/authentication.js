const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const {accesstoken} = req.headers
        console.log(req.headers);
        if(!accesstoken) {
            res.status(401).json({message: 'Please Login First'})
        } else {
            const decoded = verifyToken(accesstoken)
            req.loggedInUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if(user) {
                next()
            } else {
                res.status(401).json({message: 'Please Login First'})
            }
        }
    } catch {
        res.status(401).json({message: 'Please Login First'})
        // res.status(500).json({message: 'Internal Server Error'})
    }
}