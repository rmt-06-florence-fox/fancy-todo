const { User } = require('../models')
const { comparePwd } = require('../helpers/password')
const { generateToken } = require('../helpers/jwt')


class UserController {
    static register( req, res) {
        let { email, password } = req.body
        let user = { email, password }
        User.create(user)
        .then(data => {
            res.status(201).json({email: data.email, password: data.password})
        })
        .catch(error => {
            if (error.name == "SequelizeUniqueConstraintError") {
                res.status(400).json({message: error.errors[0].message})
            } else if (error.name == "SequelizeValidationError") {
                res.status(400).json({message: error.errors[0].message});                
            } else {
                res.status(500).json({message: `Internal server error`})
            }
        })
    }
    
    static login(req, res) {
        User.findOne({ where: {email: req.body.email}})
        .then(data => {
            if (!data) {
                res.status(401).json({message: `Invalid account`})
            } else if (comparePwd(req.body.password, data.password)) {
                const acces_token = generateToken({id: data.id, email: data.email})
                res.status(200).json({acces_token})
            } else {
                res.status(401).json({message: `Invalid email/password`})
            }            
        })
        .catch(error => {
            res.status(500).json(error)
        })
    }
}

module.exports = UserController