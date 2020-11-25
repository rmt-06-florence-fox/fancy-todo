
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {getToken} = require('../helper/jwt')
const checker = require('../helper/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const { get } = require('http');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



class UserController {

static registerForm(req, res, next){
    let newUser = {
        email: req.body.email,
        password: req.body.password
    }
    User.create(newUser)
    .then(data =>{
        res.status(201).json({id: data.id, email:data.email})
    })
    .catch(err =>{
       next({err})
    })

}
static googleLogin(req,res, next){
    let payLoad ;
    client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket =>{
        payLoad = ticket.getPayload()
       return User.findOne({
            where:{
                email: payLoad.email
            }
        })
    })
    .then(result =>{
        if(result){
            return result
        } else {
            return User.create({
                email: payLoad.email,
                password: process.env.GOOGLE_PASSWORD
            })
        }
    })
    .then(user =>{
        const token_access = getToken({id: user.id, email: user.email})
        res.status(200).json({token_access})

    })
    .catch(err =>{
        next(err)
    })
}
static loginForm(req, res, next){

    User.findOne({where : {email: req.body.email}})
    .then(data =>{
        if(!data){
            res.status(401).json({message: 'Invalid Account'})
        } else {
            if(checker(req.body.password, data.password)){
                let token_access = getToken({id: data.id, email: data.email})
                res.status(200).json({token_access})
            } else {
                next({
                    status: 401,
                    message: 'invalid email / password'})
            }
        }
    })
    .catch(err =>{
       next(err)
    })
}

}

module.exports = UserController