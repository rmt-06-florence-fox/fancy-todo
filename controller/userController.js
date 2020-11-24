const {User} = require('../models/index.js')
const {comparePassword} = require('../helper/encryption.js')
const {getToken} = require('../helper/jwt.js')


class UserController {

    static async registerUser(req,res){
        const newUser  = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        console.log('===========Get new User Data=========')
        console.log(req.body)
        console.log(newUser)
        try {
            console.log('==============Try Create New User===========')
            const regUser = await User.create( newUser )
            console.log('==============Succes Create New User===========')
            console.log(regUser)
            res.status(201).json(regUser)
        } catch (error) {
            res.status(400).json({error})
        }
    }

    static async signInUser(req,res){
        const email = req.body.email
        const password = req.body.password
        console.log('=========== Get User Sign In Data=================')
        console.log(email,password)

        try {
            console.log('=======Try to find One===========')
            const user = await User.findOne({
                where: {
                    email
                }
            })
            console.log('========Success to find one=================')
            console.log(user)

            if(!user){
                throw 'Invalid email/password'
            }else if(comparePassword(password,user.password)){
                console.log('===========Correct Pass==========')
                const access_token = getToken({ id : user.id , email:user.email })
                console.log(access_token)
                res.status(200).json(access_token)
            }else {
                throw 'Invalid email/password'
            }
        } catch (error) {
            res.status(400).json({error})
        }
    }
}


module.exports = UserController