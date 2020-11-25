const {Todo, User} = require('../models/index')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.googleClient);
const Bcrypt = require('../helper/bcrypt')
const jwt = require('jsonwebtoken');
class UserController{
    static register(req, res, next){
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        User.create(obj)
        .then(value => {
            res.status(200).json({name: value.name, email: value.email})
        })
        .catch(error => {
            next(error)
        })
    }
    static login(req, res, next){
        const email = req.body.email
        const password = req.body.password
        console.log(email);
        User.findOne({where:{
            email: email
        }})
        .then(value => {
            if (!value) {
                // res.status(401).json(`invalid account`)
                throw {
                    status: 401,
                    message: `invalid account`
                }
            }else if(Bcrypt.compare(password, value.password)){
                const token = jwt.sign({id: value.id, email:value.email}, process.env.secret)
                req.headers.token = token
                req.loginUser.id = +value.dataValues.id
                res.status(200).json(token)
            }else{
                // res.status(401).json(`email or password invalid`)
                throw {
                    status: 401,
                    message: `email or password invalid`
                }
            }
        })
        .catch(error => {
           next(error)
        })
    }
    static googleLogin(req, res, next){
        let payload = null
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.googleClient, 
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then(value => {
            if (value) {
                return value
            }else{
                return User.create({
                    name: payload.email.split('@')[0],
                    email: payload.email,
                    password: process.env.secretPassword
                })
            }
        })
        .then(user => {
            const access_token = jwt.sign({id: user.id, email:user.email}, process.env.secret)
            res.status(200).json(access_token)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = UserController