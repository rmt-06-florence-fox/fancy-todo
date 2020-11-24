const {
    Todo
} = require('../models')


class TodosController {
    static addTodo(req, res) {
        let payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userLogIn.id
        }
        Todo.create(payload)
            .then(data => {
                // throw error
                res.status(201).json(data)
            })
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    res.status(400).json(err.errors)
                } else {
                    res.status(500).json('internal server error')
                }
            })
    }

    static allTodo(req, res) {
        Todo.findAll({where: {
            UserId: req.userLogIn.id
        }})
            .then(data => {
                // throw error
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json('internal server error')
            })
    }

    static async getTodo(req, res) {
        try {
            const id = +req.params.id
            // throw error
            const data = await Todo.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json('internal server error')
        }
    }

    static async updateTodo(req, res) {
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
                res.status(404).json('error not found')
            }
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                res.status(400).json(error.errors)
            } else {
                res.status(500).json('internal server error')
            }
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
                res.status(404).json('error not found')
            }
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                res.status(400).json(error.errors)
            } else {
                res.status(500).json('internal server error')
            }
        }
    }

    static delTodo(req, res){
        const id = +req.params.id 
        Todo.destroy({where: {id}})
            .then(data => {
                if (data != 0){
                    res.status(200).json('todo success to delete')
                } else {
                    // throw err
                    res.status(404).json('error not found')
                }
            })
            .catch(err => {
                res.status(500).json('internal server error')
            })
    }

}

module.exports = TodosController