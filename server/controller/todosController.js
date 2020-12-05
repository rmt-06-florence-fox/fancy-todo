const { Todo } = require('../models')
class TodoController {
    static async getTodos(req, res, next) {
        try {
            const data = await Todo.findAll({
                where : {
                    UserId : req.loggedInUser.id
                }
            })
            console.log(data);
            res.status(200).json({data})
        } catch (err) {
            next(err)
        }
    }

    static createTodo (req, res, next) {
        const payload = {
            title : req.body.title,
            description : req.body.description,
            due_date : new Date(req.body.dueDate),
            status : true,
            UserId : req.loggedInUser.id
            
        }
        console.log(payload);

        Todo.create(payload)
            .then(todo => res.status(201).json(todo))
            .catch(err => next(err))

    }

    static async getTodoById(req, res, next) {
        const id = +req.params.id
        try {
            const data = await Todo.findByPk(id)
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({errorDesc: 'NotFound' })
            }
        } catch (err){
            next(err)
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const id = +req.params.id
            const payload = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.dueDate,
                status: req.body.status
            }
            const data = await Todo.findByPk(id)
            if (!data) {
                throw {
                    // errorDesc : NotFound
                    errorDesc : "NotFound"
                }
            } else {
                const todo = await Todo.update(payload, {
                    where: {
                        id: id
                    },
                    returning: true
                })
                res.status(200).json(todo[1])
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateStatusTodo(req, res, next) {
        const id = +req.params.id
        const payload = {
            status : req.body.status,
        }

        try {
            console.log(req.body);
            const data = await Todo.update(payload, {
                    where: {
                        id
                    },
                    returning : true,
                })
                res.status(500).json(200)
        } catch (err) {
            next(err)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            const id = +req.params.id
            const data = await Todo.findByPk(id)
            if (!data) {
                throw {
                    errorDesc : "NotFound"
                }
            } else {
                await Todo.destroy({
                    where : {
                        id: id
                    }
                })
                res.status(200).json({message: 'Successfully for delete Todo'})
            }
        } catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController
