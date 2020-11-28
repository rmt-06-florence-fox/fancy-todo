const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register (req, res, next) {
        let userData = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(userData)
        .then(result => {
            res.status(201).json({email: result.email, id: result.id})
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        User.findOne({
            where : {
                email: req.body.email
            }
        })
        .then(result => {
            if(!result) {
                throw {
                    status: 400,
                    message: 'Invalid email/password'
                }
            }
            else {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const access_token = generateToken({id : result.id, email: result.email})
                    res.status(200).json({access_token})
                }
                else {
                    throw {
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleLogin(req, res, next) {
        let payload;
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            // console.log(payload.email,'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
            return User.findOne({
                where: {
                    email: payload.email
                }
            }) 
        })
        .then(user => {
            // console.log(user, 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')
            if (user) {
                return user
            }
            else {
                return User.create({
                    email: payload.email,
                    password: process.env.PASSWORD
                })
            }
        })
        .then(user => {
            const access_token = generateToken({ 
                email: user.email,
                id: user.id
            })
            res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController