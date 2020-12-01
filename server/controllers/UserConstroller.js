const { User } = require("../models")
const { comparePass } = require("../helper/generatePass")
const { generateToken } = require("../helper/generateToken")
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserControllers {
    static signUp(req, res, next) {
        const signup = {
            email: req.body.email,
            password: req.body.password
        }
        
        User.create(signup)
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email
                })
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

    static signIn(req, res, next) {
        User.findOne({ where: { email: req.body.email }})
            .then(data => {
                if(!data) {
                    next({
                        name: "Invalid Account"
                    })
                } else {
                    const access_token = generateToken({id: data.id, email: data.email})
                    if (comparePass(req.body.password, data.password)) {
                        res.status(200).json({access_token})                        
                    } else {
                        next({
                            name: "Invalid Account"
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static goolgleSignIn(req, res, next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,  
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({where: {email: payload.email}})
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        email: payload.email,
                        password: process.env.SECRET_PASSWORD
                    })
                }
            })
            .then(user => {
                const access_token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserControllers