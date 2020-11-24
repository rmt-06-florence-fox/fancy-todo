const { ToDo } = require('../models');

class ToDoController {

    static async getToDo(req, res) {
        try {
            const todos = await ToDo.findAll({where : {
                UserId: req.loggedInUser.id
            }});
            res.status(200).json(todos);
        }
        catch (error) {
            res.status(500).json(error)
        }
    };

    static createToDo(req, res) {
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
                res.status(400).json(err.message)
            })
    };

    static async getToDoById(req, res) {
        let todoId = req.params.id
        try {
            const todo = await ToDo.findOne({
                where: {
                    id: todoId
                }
            })
            if(todo == null) {
                res.status(404).json('No to do found')
            }
            res.status(200).json(todo)
        }

        catch (err) {
            res.status(500).json(err)
        }
    }

    static checkToDo(req, res) {
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
                    res.status(404).json('No to do found')
                }
                ToDo.findOne({where : {
                    id: todoId
                }})
                    .then(result2 => {
                        res.status(200).json(result2)
                    })
            })
            .catch(err => {
                res.status(400).json(err.message)
            })

    };

    static async updateToDo(req, res) {
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
                res.status(404).json('No to do found')
            }
            ToDo.findOne({where : {
                id: todoId
            }})
                .then(result2 => {
                    res.status(200).json(result2)
                })
        }
        catch (error) {
            res.status(400).json(error.message)
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