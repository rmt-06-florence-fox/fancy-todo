const { User } = require('../models')
const {createToken, verifyToken} = require('../helper/jwt')
const { comparePw } = require('../helper/password')

class UserController{
    static addUser(req, res){
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(payload)
            .then(data => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(err => {
                res.status(400).json(err.errors)
            })
    }

    static logIn(req, res){
        User.findOne({where: {email : req.body.email}})
            .then(data => {
                if (!data){
                    res.status(401).json({msg : 'Invalid account'})
                } else if (comparePw(req.body.password, data.password)){
                    const access_token = createToken({id: data.id, email: data.email})
                    res.status(200).json({access_token})
                } else {
                    res.status(401).json({msg: 'Invalid email/password'})
                }
            })
            .catch(err => {
                res.status(400).json(err.errors)
            })
    }
}

module.exports = UserController