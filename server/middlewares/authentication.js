const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

async function authentication (req, res, next){

    try {
        const access_token = req.headers.access_token
        if(!access_token){
            res.status(401).json({message: `You haven't login yet`})
        } else {
            const decoded = jwt.verify(access_token, 'SECRET')
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
                res.status(401).json({message: 'You need to login first'})
            }
        }  
    } catch (error) {
        console.log(error)
        res.status(401).json({message: `You need to login first`})
    }    
}

module.exports = authentication