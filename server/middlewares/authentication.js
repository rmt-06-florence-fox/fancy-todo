const {User} = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req,res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            res.status(401).json({ message: `Access denied, please login first` })
        } else {
            const decoded = verifyToken(access_token)
            req.loggedInUser = decoded
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) {
                next()
            } else {
                res.status(401).json({ message: `Access denied, please login first` })
            }
        }        
    } catch (error) {
        res.status(500).json(error)
    }
}