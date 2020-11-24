const { Todo, User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const age = require('../helpers/age')

class Controller {

    static register(req, res) {
        let obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
        .then(data => {
            res.status(201).json({ id: data.id, username: data.username, email: data.email })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Failed to create user'})
        })
    }

    static login(req, res) {
        User.findOne({ where: { username: req.body.username, email: req.body.email }})
        .then(data => {
            if(!data) {
                res.status(401).json({message: 'are you sure you have your account registered?'})
            } else {
                const access_token = jwt.sign({id: data.id, username: data.username, email: data.email}, 'rahasiarangga')
                if(bcrypt.compareSync(req.body.password, data.password)) {
                    res.status(200).json({access_token})                    
                } else {
                    res.status(401).json({message: 'are you sure you have your account registered?'})
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error'})
        })
    }

    static addTodo(req, res) {
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
            if(err.message == 'Validation error: Validation isAfter on due_date failed') {
                res.status(401).json({message: `Date must be greater than today`})
            } else {
                console.log(err);
                res.status(500).json({message: 'Internal server error'})
            }
        })
    }

    static todoList(req, res) {
        Todo.findAll({where: {UserId: req.loggedInUser.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error'})
        })
    }


    static getTodo(req, res) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(data) {
                res.status(200).json({data})
            } else {
                res.status(404).json({message: 'Data not found'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error'})
        })
    }

    static updateTodo(req, res) {
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
                res.status(404).json({message: 'Data not found'})
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            if(err.message == 'Validation error: Validation isAfter on due_date failed') {
                res.status(401).json({message: `Date must be greater than today`})
            } else {
                console.log(err);
                res.status(500).json({message: 'Internal server error'})
            }
        })
    }

    static updateStatusTodo(req, res) {

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
                res.status(404).json({message: 'Data not found'})
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            if(err.message == 'Validation error: Validation isAfter on due_date failed') {
                res.status(401).json({message: `Date must be greater than today`})
            } else {
                console.log(err);
                res.status(500).json({message: 'Internal server error'})
            }
        })
    }

    static deleteTodo(req, res) {
        let id = +req.params.id

        Todo.destroy({where: {id}})
        .then(data => {
            if(data != 0) {
                res.status(200).json({message: 'Todo deleted'});
            } else {
                res.status(404).json({message: 'Data not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Internal server error'})
        })
    }

}

module.exports = Controller