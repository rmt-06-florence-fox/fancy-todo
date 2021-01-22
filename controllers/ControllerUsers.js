const {
    OAuth2Client
} = require('google-auth-library');
const {
    User
} = require('../models/index')
const {
    decrypt
} = require('../helpers/passwordHandler')
const {
    generateToken
} = require('../helpers/tokenHandler')

class ControllerUsers {

    static registerUser(req, res, next) {
        const payload = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthdate: req.body.birthdate
        }

        User.create(payload)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                // console.log(err);
                next(err)
                // res.status(500).json('Internal Server Error!')
            })
    }

    static loginUser(req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
                where: {
                    email: payload.email
                }
            })
            .then(data => {
                if (data) {
                    const checkLogin = decrypt(payload.password, data.password)
                    if (checkLogin) {
                        const token = generateToken(data.id, data.email)
                        res.status(200).json({
                            access_token: token
                        })
                    } else {
                        throw ({
                            status: 400,
                            message: 'Username/password is invalid!'
                        })
                        // res.status(400).json('Username/Password is invalid!')
                    }
                } else {
                    throw ({
                        status: 401,
                        message: 'Email not found! Please register first.'
                    })
                    // res.status(404).json('Email not found! Please register first.')
                }
            })
            .catch(err => {
                // console.log(err);
                next(err)
                // res.status(500).json('Internal Server Error!')
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let ticket
        
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
        .then(payload => {
            ticket = payload.getPayload()
            
            return User.findOne({
                where: {
                    email: ticket.email
                }
            })
        })
        .then(data => {
            if (data) {
                return data
            } else {
                return User.create({
                    username: ticket.family_name,
                    password: 'secret456',
                    email: ticket.email,
                    first_name: ticket.given_name,
                    last_name: ticket.family_name
                })
            }
        })
        .then(data => {
            const access_token = generateToken(data.id, data.email)
            res.status(200).json({
                access_token
            })
        })
        .catch(err => {
            console.log(err);
            next(err)
        })

    }
}

module.exports = ControllerUsers