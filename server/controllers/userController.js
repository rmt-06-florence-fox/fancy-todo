const { User } = require ("../models/index")
const bcrypt = require ('bcryptjs')
const { generateToken } = require ('../helpers/jwt.js')

class UserController {

    static async register (req, res, next) {
        try {
            let data = {
                email : req.body.email,
                username : req.body.username,
                password : req.body.password
            }
            const newUser = await User.create(data)
            res.status(201).json({
                email : newUser.email,
                username : newUser.username
            })
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            let email = req.body.email
            const user = await User.findOne ({where : {email}})
            if (!user) {
                throw {
                    status : 401,
                    msg : "Invalid Account"
                }
            } else  {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = generateToken({id: user.id, username: user.username})
                    res.status(200).json({token})
                } else {
                    throw {
                        status : 401,
                        msg : "Invalid Username/Password"
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = UserController