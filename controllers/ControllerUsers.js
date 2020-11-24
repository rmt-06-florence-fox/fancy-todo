const { User } = require('../models/index')
const { decrypt } = require('../helpers/passwordHandler')
const { generateToken } = require('../helpers/tokenHandler')

class ControllerUsers {

    static registerUser(req, res) {
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
            console.log(err);
            res.status(500).json('Internal Server Error!')
        })
    }

    static loginUser(req, res) {
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
                    res.status(400).json('Username/Password is invalid!')
                }
            } else {
                res.status(404).json('Email not found! Please register first.')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Internal Server Error!')
        })
    }   
}

module.exports = ControllerUsers