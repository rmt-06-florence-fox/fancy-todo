const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')

class UserController {
    static async signUp(req, res) {
        try {
            let userObj = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
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
            } else if(comparePass(req.body.password, data.password)) {
                const payload = {
                    id: data.id,
                    email: data.email,
                    name: data.name
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            } else {
                res.status(400).json({message : 'Invalid Email or Password!'})
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error"})
        }
    }
}

module.exports = UserController