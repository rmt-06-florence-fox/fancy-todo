const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class ControllerUsers {

    static registerUser(req, res) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(payload)
        .then(data => {
            res.status(201).json(data.email)
        })
        .catch(err => {
            res.status(500).json('Internal Server Error!')
        })
    }

    static loginUser(req, res) {
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
                const login = bcrypt.compareSync(payload.password, data.password)
                if (login) {
                    const token = jwt.sign({email: data.email, password: data.password}, 'boomboomsplash')
                    res.status(200).json(token)
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