const { User } = require('../models')
const {createToken, verifyToken} = require('../helper/jwt')
const  {comparePw, generatePw}  = require('../helper/password')
const {OAuth2Client} = require('google-auth-library');

class UserController{
    static addUser(req, res, next){
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: generatePw(req.body.password)
        }
        User.create(payload)
            .then(data => {
                res.status(201).json({id: data.id, email: data.email})
            })
            .catch(err => {
                next(err)
                // res.status(400).json(err.errors)
            })
    }

    static logIn(req, res, next){
        User.findOne({where: {email : req.body.email}})
            .then(data => {
                console.log(data);
                if (!data){
                    throw{
                        status: 401,
                        message: 'Invalid account'
                    }
                    // res.status(401).json({msg : 'Invalid account'})
                } else if (comparePw(req.body.password, data.password)){
                    // console.log(comparePw(req.body.password, data.password),'<<<');
                    const access_token = createToken({id: data.id, email: data.email})
                    res.status(200).json({access_token})
                } else {
                    throw{
                        status: 401,
                        message: 'Invalid email/password'
                    }
                    // res.status(401).json({msg: 'Invalid email/password'})
                }
            })
            .catch(err => {
                next(err)
                // res.status(400).json(err.errors)
            })
    }

    static googleLogIn(req, res, next){ 
        const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
        // console.log(req.body);
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENTID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                // res.status(200).json('masuk pak eko')
            })
            .then(user => {
                if (user){
                    return user
                } else {
                    return User.create({
                        name: payload.name,
                        email: payload.email,
                        password: generatePw(process.env.GOOGLE_PW)
                    })
                }
            })
            .then(user => {
                const access_token = createToken({
                    id: user.id,
                    email: user.email
                })
                res.status(201).json({access_token})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController