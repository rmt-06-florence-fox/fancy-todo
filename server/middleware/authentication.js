const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

module.exports = (req,res,next) => {
    try {
        console.log('masuk authentication')
        const { access_token } = req.headers

        if (!access_token){
            res.status(401).json({message: 'please login first'})
        } else {
            const decoded = verifyToken(access_token)
            req.loggedInUser = decoded
            User.findOne({where: {id: decoded.id}})
            .then(data => {
                if(data){
                    next()
                }else {
                    res.status(401).json({message: 'please login first'})
                }
            })
            .catch(error => {
                res.status(401).json({message: 'please login first'})
            })
            
        }
    } catch (err) {
        res.status(401).json({message: 'please login first'})
    }
}