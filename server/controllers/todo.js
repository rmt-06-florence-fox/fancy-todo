const { ToDo } = require('../models');
const axios = require('axios')
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
        ToDo.findOne({where: {
            id: todoId
        }})
        .then(result => {
            if(result == 0) {
                throw {
                    status: 404,
                    message: 'no to do founded'
                }
            }
            const data = {
                title: result.title,
                description: result.description,
                status: 'sudah',
                due_date: result.due_date,
                UserId: result.UserId,
            }
            ToDo.update(data, {where: {
                id: todoId
            }})
            .then(result2 => {
                console.log(result2)
                if(result2 == 0) {
                    throw {
                        status: 500,
                        message: 'internal server error'
                    }
                }
                res.status(200).json(result2)
            })
        })
        .catch(err => {
            next(err)
        })
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
                res.status(200).json('to do success to delete')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static holiday(req, res, next) {
        axios({
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.SECRETKEY}&country=ID&year=2020`,
            method: 'GET'
        })
        .then(result => {
            res.status(200).json(result.data.response)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = ToDoController