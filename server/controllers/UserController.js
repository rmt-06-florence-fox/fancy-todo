const { User } = require('../models/index')
const { compare } = require('../helpers/bcrypt-pass')
const { getToken } = require('../helpers/jwt-token')
const {OAuth2Client} = require('google-auth-library')
const { use } = require('../routes')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static async addUser(req, res, next) {
        const obj = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        try {
            const data = await User.create(obj)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            if (!req.body.username && !req.body.password) {
                throw {
                    status: 400,
                    message: 'Masukkan Email dan Password!!'
                }
            } else if (!req.body.username) {
                throw {
                    status: 400,
                    message: 'Masukkan Email!!'
                }
            } else if (!req.body.password) {
                throw {
                    status: 400,
                    message: 'Masukkan Password!!'
                }
            } else {
                const data = await User.findOne({where: {username: req.body.username}})
                if (!data) {
                    throw {
                        status: 401,
                        message: 'Invalid Account'
                    }
                } else if (compare(req.body.password, data.password)) {
                    const access_token = getToken(data)
                    res.status(200).json({access_token, name: data.name})
                } else {
                    throw {
                        status: 401,
                        message: 'Username / Password is incorrect'
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static googleLogin(req, res, next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                where: {
                    username: payload.email
                }
            })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                return User.create({
                    name: payload.name,
                    username: payload.email,
                    password: process.env.GOOGLE_PASSWORD
                })
            }
        })
        .then(user => {
            const access_token = getToken({id: user.id, username: user.email})
            res.status(200).json({access_token, name: user.name})
        })
        .catch(err => {
            next(err)
        })
    }
}


module.exports = UserController