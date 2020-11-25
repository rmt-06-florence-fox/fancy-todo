const { ToDo } = require('../models');
// const axios = require('axios')
class ToDoController {

    static async getToDo(req, res, err) {
        try {
            const todos = await ToDo.findAll({where : {
                UserId: req.loggedInUser.id
            }});
            if(todos.length == 0) {
                throw {
                    status: 404,
                    message: 'No to do found'
                }
            }
            else {
                res.status(200).json(todos);
            }
        }
        catch (error) {
            next(err)
        }
    };

    static createToDo(req, res, next) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date),
            UserId: req.loggedInUser.id
        }

        ToDo
            .create(data)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                next(err)
            })
    };

    static async getToDoById(req, res, next) {
        let todoId = req.params.id
        try {
            const todo = await ToDo.findOne({
                where: {
                    id: todoId
                }
            })
            if(todo == null) {
                throw {
                    status: 404,
                    message: 'No to do found'
                }
            }
            res.status(200).json(todo)
        }

        catch (err) {
            next(err)
        }
    }

    static checkToDo(req, res, next) {
        const todoId = req.params.id
        const data = {
            status: req.body.status
        }

        ToDo
            .update(data, {
                where: {
                    id: todoId
                }
            })
            .then(result => {
                if (result == 0) {
                    throw {
                        status: 404,
                        message: 'No to do found'
                    }
                }
                ToDo.findOne({where : {
                    id: todoId
                }})
                    .then(result2 => {
                        res.status(200).json(result2)
                    })
            })
            .catch(err => {
                next(err)
            })

    };

    static async updateToDo(req, res, next) {
        const todoId = req.params.id
        const update = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date),
            UserId: req.loggedInUser.id
        }
        try {
            const updateToDo = await ToDo.update(update, {
                where: {
                    id: todoId
                }
            })
            if (updateToDo == 0) {
                throw {
                    status: 404,
                    message: 'No to do found'
                }
            }
            ToDo.findOne({where : {
                id: todoId
            }})
                .then(result2 => {
                    res.status(200).json(result2)
                })
        }
        catch (err) {
            next(err)
        }
    };

    static deleteToDo(req, res) {
        let todoId = req.params.id
        ToDo
            .destroy({where : {
                id: todoId
            }})
            .then(result => {
                if(result == 0) {
                    res.status(404).json('No to do found')
                }
                res.status(200).json('to do success tp delete')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = ToDoController