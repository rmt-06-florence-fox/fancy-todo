const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt.js');
const email = require('../nodemailer/nodemailer.js');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//const axios = require('axios');

class UserController {
    static register(req, res) {
        email(req.body.email)
        let userObj = {
            email: req.body.email,
            password: req.body.password
        }
        return User.create(userObj)
        .then(data => {
            res.status(201).json({email: data.email, id: data.id});
        })
        .catch(err => {
            //console.log(err)
            res.status(500).json({message: 'internal server error'});
        })
    }

    static login(req, res, next) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if(!data) {
                throw {
                    status: 401,
                    message: 'invalid account'
                }  
            }
            else {
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    const access_token = generateToken({id: data.id, email: data.email});
                    res.status(200).json({access_token});
                }
                else {
                    throw {
                        status: 401,
                        message: 'invalid email / password'
                    }  
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleLogin(req, res, next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then(user => {
            if (user) {
                return user
            } else {
                return User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD
                })
            }
        })
        .then(user => {
            const access_token = signToken({
                email: user.email,
                id: user.id
            })
            res.status(200).json({ access_token })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController;
