const { Todo, User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller {

    static register(req, res, next) {
        let obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
        .then(data => {
            if (!data) {
                throw {
                    status: 500,
                    message: 'Failed to create user'
                }
            }
            res.status(201).json({ id: data.id, username: data.username, email: data.email })
        })
        .catch(err => {
            console.log(err);
            next(err)
            // throw {
            //     status: 500,
            //     message: 'Failed to create user'
            // }
            // res.status(500).json({message: 'Failed to create user'})
        })
    }

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email }})
        .then(data => {
            if(!data) {
                // console.log('======');
                // console.log(data);
                throw {
                    status: 401,
                    message: 'are you sure you have your account registered?'
                }
                // res.status(401).json({message: 'are you sure you have your account registered?'})
            } else {
                const access_token = jwt.sign({id: data.id, username: data.username, email: data.email}, 'rahasiarangga')
                if(bcrypt.compareSync(req.body.password, data.password)) {
                    res.status(200).json({access_token})                    
                } else {
                    console.log('======');
                    throw {
                        status: 401,
                        message: 'are you sure you have your account registered?'
                    }
                    // res.status(401).json({message: 'are you sure you have your account registered?'})
                }
            }
        })
        .catch(err => {
            // console.log(err);
            next(err)
        })
    }


    static googleLogin(req, res, next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket => {
            console.log('MASUK TICKET');
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
                console.log('MASUK CREATE')
                // console.log(payload);
                return User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD,
                })
            }
        })
        .then(user => {
            console.log('MASUK FINAL');
            const access_token = jwt.sign({id: user.id, username: user.username, email: user.email}, 'rahasiarangga')
            res.status(200).json({access_token})
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static addTodo(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        Todo.create(obj)
        .then(data => {
            res.status(201).json({data})
            
        })
        .catch(err => {
            next(err)
            // if(err.name == 'SequelizeValidationError') {
            //     console.log(err);
            //     res.status(401).json(err.message)
            // } else {
            //     console.log(err);
            //     next(err)
            // }
        })
    }

    static todoList(req, res, next) {
        Todo.findAll({where: {UserId: req.loggedInUser.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }


    static getTodo(req, res, next) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(data) {
                console.log('HUHUHUHU');
                res.status(200).json({data})
            } else {
                console.log('HIHA');
                throw {
                    status: 404,
                    message: 'Data not found'
                }
                // res.status(404).json({message: 'Data not found'})
            }
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static updateTodo(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        let id = req.params.id

        Todo.update(obj, {where: {id}})
        .then(data => {
            if(data != 0) {
                console.log(obj);
                return Todo.findOne({ where: {id}})
            } else {
                console.log(data);
                throw {
                    status: 404,
                    message: 'Data not found'
                }
                // res.status(404).json({message: 'Data not found'})
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            next(err);
            // if(err.message == 'Validation error: Validation isAfter on due_date failed') {
            //     res.status(401).json({message: `Date must be greater than today`})
            // } else {
            //     console.log(err);
            //     next(err)
            // }
        })
    }

    static updateStatusTodo(req, res, next) {

        let obj = {status: req.body.status}
        let id = +req.params.id
        let todo = []
        Todo.update(obj, {where: {id}})
        .then(data => {
            if(data != 0) {
                console.log(obj);
                return Todo.findOne({ where: {id}})
            } else {
                console.log(data);
                throw {
                    status: 404,
                    message: 'Data not found'
                }
                // res.status(404).json({message: 'Data not found'})
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            next(err)
            // if(err.message == 'Validation error: Validation isAfter on due_date failed') {
            //     res.status(401).json({message: `Date must be greater than today`})
            // } else {
            //     console.log(err);
            // }
        })
    }

    static deleteTodo(req, res, next) {
        let id = +req.params.id

        Todo.destroy({where: {id}})
        .then(data => {
            if(data != 0) {
                res.status(200).json({message: 'Todo deleted'});
            } else {
                throw {
                    status: 404,
                    message: 'Data not found'
                }
                // res.status(404).json({message: 'Data not found'})
            }
        })
        .catch(err => {
            next(err)
        })
    }


    ////////////////////////////////////////////////////////////
    static weather(req, res, next) {
        var unirest = require("unirest");

        var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

        req.query({
            "q": "Jakarta, ID",
            "cnt": "5",
            "mode": "null",
            "lon": "0",
            "type": "link, accurate",
            "lat": "0",
            "units": "imperial, metric"
        });
        
        req.headers({
            "x-rapidapi-key": "afe633e64dmshadad915c1d8b611p10cffdjsnd66ee2fde21f",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "useQueryString": true
        });


        req.end(function (result) {
            if (result.error) throw new Error(result.error);

            res.status(200).json(result.body)
            console.log(result.body);
        });
    }
}

module.exports = Controller

        