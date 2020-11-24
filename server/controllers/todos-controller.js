const {
    Todo
} = require('../models')


class TodosController {
    static addTodo(req, res, next) {
        let payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userLogIn.id
        }
        Todo.create(payload)
            .then(data => {
                // throw err
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
                // if (err.name == "SequelizeValidationError") {
                //     res.status(400).json(err)
                // } else {
                //     res.status(500).json('internal server err')
                // }
            })
    }

    static allTodo(req, res, next) {
        Todo.findAll({where: {
            UserId: req.userLogIn.id
        }})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
                // res.status(500).json('internal server err')
            })
    }

    static async getTodo(req, res, next) {
        try {
            const id = +req.params.id
            // throw err
            const data = await Todo.findByPk(id)
            res.status(200).json(data)
        } catch (err) {
            next(err)
            // res.status(500).json('internal server err')
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const id = +req.params.id
            let payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const data = await Todo.update(payload, {
                where: {
                    id
                },
                returning: true
            })
            // throw err
            if (data[0] != 0){
                res.status(200).json(data[1][0])
            } else {
                throw{
                    status: 404,
                    message: 'error not found'
                }
                // res.status(404).json('err not found')
            }
        } catch (err) {
            next(err)
            // if (err.name == "SequelizeValidationError") {
            //     res.status(400).json(err.errors)
            // } else {
            //     res.status(500).json('internal server err')
            // }
        }
    }

    static async updateStatus(req, res) {
        try {
            const id = +req.params.id
            let payload = {
                status: req.body.status
            }
            const data = await Todo.update(payload, {
                where: {
                    id
                },
                returning: true
            })
            // throw err
            if (data[0] != 0){
                res.status(200).json(data[1][0])
            } else {
                throw{
                    status: 404,
                    message: 'error not found'
                }
                // res.status(404).json('err not found')
            }
        } catch (err) {
            next(err)
            // if (err.name == "SequelizeValidationError") {
            //     res.status(400).json(err.errors)
            // } else {
            //     res.status(500).json('internal server err')
            // }
        }
    }

    static delTodo(req, res){
        const id = +req.params.id 
        Todo.destroy({where: {id}})
            .then(data => {
                if (data != 0){
                    res.status(200).json('todo success to delete')
                } else {
                    throw{
                        status: 404,
                        message: 'error not found'
                    }
                    // res.status(404).json('err not found')
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json('internal server err')
            })
    }

}

module.exports = TodosController