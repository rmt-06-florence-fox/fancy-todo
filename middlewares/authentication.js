const {User} = require("../models/index")
const Helper = require("./helpers")

module.exports = async (req, res, next)=>{
    try{
        // console.log(">>>>>>>>>>>>>>>>>>", req.headers.access_token)
        const access_token = req.headers.access_token
        // console.log("access this third")
        
        const decoded = Helper.verifyToken(access_token)
        // console.log("access this too")
        req.loginUser = decoded
        const user = await User.findOne({
            where:{
                id: decoded.id
            }
        })
            // console.log(user)
        if(user){
            next()
        } else {
            res.status(401).json({msg: 'please login first'})
        }
        
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'internal server error'})
    }
}