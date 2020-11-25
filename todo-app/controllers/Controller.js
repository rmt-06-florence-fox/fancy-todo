const { Todo, User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
// const age = require('../helpers/age')

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
        User.findOne({ where: { username: req.body.username, email: req.body.email }})
        .then(data => {
            if(!data) {
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
        axios({
            url: '',
            method: 'GET'
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }
}

module.exports = Controller