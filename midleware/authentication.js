const authorization = require("./authorization");
const {decodedToken}  = require('../helper/jwt.js')
const {User} = require('../models/index.js')

async function authenticatoin(req,res,next){
    
    try {
        console.log('=============Authenticate============')

        console.log(req.headers.access_token)

        const token = req.headers.access_token
        if(token){
            console.log('==================Decoded=================')
            const decoded = decodedToken(token)

            console.log(decoded.payload.id)

            const user = await User.findOne({
                where : {
                    id: decoded.payload.id
                }
            })
            console.log('============== Get The User Data=========')
            console.log(user)

            if(user){
                req.loggedInUser = decoded
                next()
            }else{
                res.status(401).json({message : 'please login'})
            }
        }else {
            res.status(401).json({message : 'please login'})
        }
    } 
    catch (error) {
        console.log('================Error 401 ==============')
        res.status(401).json({error : 'please logIn'})
    }
}

module.exports = authenticatoin