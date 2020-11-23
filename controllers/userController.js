const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const jwt = require('jsonwebtoken')

class UserController {
    static async signUp(req, res) {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(userObj)
            res.status(201).json({id: data.id, email: data.email})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    static async signIn(req, res) {
        try {
            const data = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if(!data) {
                res.status(400).json({message : 'Invalid Account!'})
            } else if(data && comparePass(req.body.password, data.password)) {
                const accessToken = jwt.sign({
                    id: data.id,
                    email: data.email
                }, process.env.SECRET, { expiresIn: 60 * 60 })
                res.status(200).json({accessToken})
            } else {
                res.status(400).json({message : 'Invalid Email or Password!'})
            }
        }
        catch (error) {
            res.status(400).json({error : error.message})
        }
    }
}

module.exports = UserController