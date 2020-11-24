const { verifyToken } = require('../helpers/tokenHandler')
const { User } = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        if (token) {
            const decoded = verifyToken(token);
            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (user) {
                req.loggedInUser = decoded  
                next()
            } else {
                res.status(401).json({message:'Please login first'})
            }
        } else {
            // next({
            //     status: 400,
            //     message: 'Please login first!'
            // })
            res.status(401).json({message: 'Please login first!'})
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'Please login first!'})
    } 
}