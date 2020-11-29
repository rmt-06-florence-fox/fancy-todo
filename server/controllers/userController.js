const { User } = require ("../models/index")
const bcrypt = require ('bcryptjs')
const { generateToken } = require ('../helpers/jwt.js')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTID);

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
                    const token = generateToken({id: user.id, email: req.body.email})
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

    static googlelogin (req, res, next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience:process.env.CLIENTID
        })
        .then(ticket => { 
            payload = ticket.getPayload()
            User.findOne ({
                where : {
                    email: payload.email
                }
            })
            .then (user => {
                if (user) {
                    const token = generateToken({id : user.id, email: user.email})
                    res.status(200).json ({token})
                } else {
                    User.create ({
                        email: payload.email,
                        username: payload.name,
                        password : process.env.CLIENTGOOGLEPASS
                    })
                    .then (user => {
                        const token = generateToken({id : user.id, email: user.email})
                        res.status(200).json ({token})
                    })
                    .catch (err => {
                        res.status(500).json(error)
                    })
                }
            })
            .catch (error => {
                res.status(500).json(error)
            })
            res.status(200).json ('masuk sini')
        })
        .catch (error => {
            res.status(500).json(error)
        })
    }
}

module.exports = UserController