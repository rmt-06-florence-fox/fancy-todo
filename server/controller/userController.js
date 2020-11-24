const {OAuth2Client} = require('google-auth-library');
const { User } = require("../models/index")
const { compare } = require('../helpers/bcrypt')
const { signToken } = require("../helpers/jwt")


class UserController {
    static signUp(req,res, next){
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(payload)
        .then(data => {
            res.status(201).json({
                email: data.email,
                id: data.id
            })
        })
        .catch(err => {
            // console.log(err, "masuk ke sini bro")
            next(err)
        })
    }
    static signIn(req,res, next){
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
            if (!data){
                throw res.status(401).json({
                    message: "wrong email/password"
                })
            }
            else if(!compare(payload.password, data.password)){
                throw res.status(401).json({
                    message: "wrong email/password"
                })
            }
            else {
                const acces_token = signToken({
                    id: data.id,
                    email: data.email
                })
                res.status(200).json({acces_token})
            }
        })
        .catch(err => {
            // console.log(err, "masuk ke sini bro")
            next(err)
        })
    }
    static googleSignIn (req, res, next){
        let {google_access_token} = req.body
        const client = new OAuth2Client("1095760211786-qokfg5qdtd90at78uq37gtaj3u5385uu.apps.googleusercontent.com")
        let email;
        client.verifyIdToken({
            idToken: google_access_token,
            audience: "1095760211786-qokfg5qdtd90at78uq37gtaj3u5385uu.apps.googleusercontent.com"
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
            where: {email: payload.email}
          })
        .then(user =>{
            if(user){
                return user
            } 
            else {
                let newUser = {
                    email,
                    password: "12345",
                }
                return User.create(newUser)
            }
          })
        })
        .then(data => {
            let token = signToken({id: data.id, email: data.email})
            return res.status(200).json(token)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}

module.exports = UserController