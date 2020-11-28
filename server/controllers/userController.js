const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static async signUp(req, res, next) {
        try {
            let userObj = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            const data = await User.create(userObj)
            res.status(201).json({ id: data.id, email: data.email })
        } catch (err) {
            next(err)
        }
    }

    static async signIn(req, res, next) {
        try {
            const data = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!data) {
                throw {
                    status: 400,
                    message: "Invalid Email/Password"
                }
            } else if (comparePass(req.body.password, data.password)) {
                const payload = {
                    id: data.id,
                    email: data.email,
                    name: data.name
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            } else {
                throw {
                    status: 400,
                    message: "Invalid Email/Password"
                }
            }
        }
        catch (err) {
            next(err)
        }
    }

    static googleLogin(req, res, next) {
        let payload;
        
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                // console.log(payload.email,'<<< dari google');
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(user => {
                        if (user) {
                            // console.log(user);
                            return user
                        } else {
                            return User.create({
                                email: payload.email,
                                password: process.env.GOOGLE_PASS,
                                name: payload.name
                            })
                        }
                    })
                    .then(user => {
                        // console.log(user, 'dari create')
                        const access_token = generateToken({ 
                            email: user.email,
                            id: user.id 
                        })
                        res.status(200).json({ access_token })
                    })
            })
            .catch(err => {
                res.status(500).json({ msg: " Internal server error " })
            })
    }
}

module.exports = UserController