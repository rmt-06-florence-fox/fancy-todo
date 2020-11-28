const {User} = require('../models/')
const Helper = require('../helper')

class UserController {

    static async register(req, res, next){
        let {fullName, userName, email, password} = req.body
        let data = { fullName, userName, email, password }
        //console.log(data)
        try {
           const response =  await User.create(data)
            let { fullName, userName, email} = response 
            res.status(201).json({fullName, userName, email})
            
        } catch (err) {
           next(err)
            
        }
    }

    static async login(req, res, next){
        let {email, password} = req.body
        
        //console.log(req.body)
        try {
            let data = await User.findOne({
                where : {
                    email
                }
            })
            if (data && Helper.checkPassword(password, data.password)){
                //res.status(200).json(data)
                const token = Helper.generateToken({
                    id : data.id,
                    userName : data.userName,
                    email : data.email
                })

                res.status(201).json({token})  

            } else {
                throw   {
                    message: 'cannot find email or password',
                    status : 400
                } 

            }

        } catch (err) {
           next(err)
        }
    }

    
}

module.exports = UserController

