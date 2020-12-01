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
            const decoded = await decodedToken(token)
            console.log(decoded)

            const user = await User.findOne({
                where : {
                    id: decoded.payload.id
                }
            })
            console.log('============== Get The User Data=========')
            console.log(user)

            if(user){
                console.log('=============User=========')
                req.loggedInUser = decoded
                next()
            }else{
                // res.status(401).json({message : 'please login'})
                console.log('===========Else error USer======')
                throw {
                    status : 401,
                    message : 'Please login'
                }
            }
        }else {
            // res.status(401).json({message : 'please login'})
            console.log('============Else Error handler===========')
            throw {
                status : 401,
                message : 'Please login'
            }
        }
    } 
    catch (error) {
        next(error)
    }
}

module.exports = authenticatoin