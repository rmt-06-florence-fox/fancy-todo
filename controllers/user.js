const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register (req, res) {
        let userData = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(userData)
        .then(result => {
            res.status(201).json({email: result.email, id: result.id})
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static login (req, res) {
        User.findOne({
            where : {
                email: req.body.email
            }
        })
        .then(result => {
            // console.log(result)
            if(!result) {
                res.status(401).json({message: 'Invalid account'})
            }
            else {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const access_token = generateToken({id : result.id, email: result.email})
                    res.status(200).json({access_token})
                }
                else {
                    res.status(401).json({message: 'Invalid email/password'})
                }
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController