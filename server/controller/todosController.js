const { Todo } = require('../models')
class TodoController {
    static async getTodos(req, res, next) {
    try {
        const data = await Todo.findAll({
            where : {
                UserId : req.loggedInUser.id
            }
        })
        res.status(200).json({data})
    } catch (error) {
        next(err)
        
    }
    }

    static createTodo (req, res, next) {
        const payload = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date,
            status : req.body.status,
            loggedInUser : req.body.id
            
        }

        Todo.create(todo)
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
                due_date: req.body.due_date
            }
            const data = await Todo.findByPk(id)
            if (!data) {
                throw {
                    errorDesc : NotFound
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

            

        } catch (error) {
            next(error)
        }

        
    }

    static async deleteTodo(req, res, next) {
        try {
            const id = +req.params.id
            const data = await Todo.findByPk(id)
            if (!data) {
                throw {
                    errorDesc : NotFound
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
