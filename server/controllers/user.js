const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static async register(req,res){

        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const data = await User.create(newUser)
            res.status(200).json({id: data.id, email: data.email})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req,res){
        
        try {
            const data = await User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            if(!data){
                res.status(401).json({message: 'Invalid account'})
            }else{
                if(bcrypt.compareSync(req.body.password, data.password)){
                    const access_token = jwt.sign({id: data.id, email: data.email}, 'SECRET')
                    res.status(200).json({access_token})
                }else{
                    res.status(404).json({message: 'password salah'})
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = UserController