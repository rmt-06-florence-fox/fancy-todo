const { User } = require('../models/index')
const { decrypt } = require('../helpers/passwordHandler')
const { generateToken } = require('../helpers/tokenHandler')

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
            next (err)
            // res.status(500).json('Internal Server Error!')
        })
    }

    static loginUser(req, res, next) {
        const payload = {
            username: req.body.username,
            password: req.body.password
        }

        User.findOne({
            where: {
                username: payload.username
            }
        })
        .then(data => {
            if (data) {
                const checkLogin = decrypt(payload.password, data.password)
                if (checkLogin) {
                    const token = generateToken(data.id, data.username)
                    res.status(200).json({access_token: token})
                } else {
                    throw({
                        status: 400,
                        message: 'Username/password is invalid!'
                    })
                    // res.status(400).json('Username/Password is invalid!')
                }
            } else {
                throw({
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
}

module.exports = ControllerUsers