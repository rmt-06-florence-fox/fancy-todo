const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')
 
async function authentication (req, res, next){

    try {
        const access_token = req.headers.access_token
        if(!access_token){
            res.status(401).json({message: `You haven't login yet`})
        } else {
            const decoded = verifyToken(access_token)
            //console.log(decoded)
            const data = await User.findOne({
                where:{
                    id: decoded.id
                }
            })
            if(data){
                req.loggedInUser = decoded
                next()
            }else{
                res.status(401).json({message: 'Token Expired'})
            }
        }  
    } catch (error) {
        console.log(error)
        res.status(401).json({message: `You need to login first`})
    }    
}

module.exports = authentication