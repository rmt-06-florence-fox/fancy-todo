const {Todo, User} = require('../models/index')
const jwt = require('jsonwebtoken')
const {compare} = require('../helper/bcrypt')
const bcrypt = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class Controller {
    static async register(req, res) {
        try {
            let user = {
                email: req.body.email,
                password: req.body.password
            }
            let data = await User.create(user)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async login(req, res){
        try {
            let data = await User.findOne({
                where: {
                    email: req.body.email    
                }
            })
            if(!data){
                res.status(401).json({message: `Invalid Account`})
            } else if(compare(req.body.password, data.password)){
                    const access_token = generateToken({id: data.id, email: data.email})
                    res.status(200).json({access_token})
            } else {
                res.status(401).json({message: `invalid email / password`})
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
}
module.exports = Controller