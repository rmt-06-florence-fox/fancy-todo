const { User } = require ("../models/index")
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

class UserController {

    static async register (req, res) {
        try {
            let data = {
                email : req.body.email,
                username : req.body.username,
                password : req.body.password
            }
            const newUser = await User.create(data)
            res.status(201).json(newUser)
        } catch (error) {
            console.log (error)
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({msg : error.name})
            } else {
                res.status(500).json({msg : error.name})
            }
        }
    }

    static async login (req, res) {
        try {
            let username = req.body.username
            const user = await Todo.findOne ({where : {username}})
            if (!user) {
                res.status(401).json({msg : "Invalid Account"})
            } else  {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET)
                    res.status(200).json({token})
                } else {
                    res.status(401).json({msg : "Invalid Username/Password"})
                }
            }
        } catch (error) {
            res.status(500).json({msg : error.name})
        }
    }
}

module.exports = UserController