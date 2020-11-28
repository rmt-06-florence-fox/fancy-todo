const {Todo, User} = require('../models/index')
const jwt = require('jsonwebtoken')
const {compare} = require('../helper/bcrypt')
const bcrypt = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTIDGOOGLE);
const axios = require('axios')

class Controller {
    static async register(req, res, next) {
        try {
            let user = {
                email: req.body.email,
                password: req.body.password
            }
            let data = await User.create(user)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            let data = await User.findOne({
                where: {
                    email: req.body.email    
                }
            })
            if(!data){
                throw({
                    status: 400,
                    message: `Invalid Account`
                })
                // res.status(401).json({message: `Invalid Account`})
            } else if(compare(req.body.password, data.password)){
                    const access_token = generateToken({id: data.id, email: data.email})
                    res.status(200).json({access_token})
            } else {
                throw({
                    status: 400,
                    message: `invalid email or password`
                })
                // res.status(401).json({message: `invalid email / password`})
            }
        } catch (error) {
            next(error)
            // res.status(500).json({message: `internal server error`})
        }
    }   
    static googleLogin(req, res, next){
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENTIDGOOGLE
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then(data => {
            if(data){
                return data
            } else {
                return User.create({
                    email: payload.email,
                    password: process.env.PASSWORD
                })
            }
        })
        .then(user => {
            const access_token = generateToken({id: user.id, email: user.email})
            res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
        })
    }
    static getQuote(req, res, next){
        axios({
            url: "https://favqs.com/api/qotd",
            method: "GET",
        })
        .then(data => {
            let obj = {
                author: data.data.quote.author,
                quote: data.data.quote.body
            }
            res.status(200).json(obj)
        })
        .catch(err => {
            next(err)
        })
    }
    static getJokes(req, res, next) {
        axios({
            url: "https://official-joke-api.appspot.com/random_joke",
            method: "GET",
        })
        .then(data => {
            console.log(data.data)
            let obj = {
                setup: data.data.setup,
                punchline: data.data.punchline
            }
            res.status(200).json(obj)
        })
        .catch(err => {
            next(err)
        })
    }
}
module.exports = Controller