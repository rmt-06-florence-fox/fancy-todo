const { Todo } = require("../models/index")

class ControllerTodo {
    static showAllDataTodos(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static addDataTodos(req, res) {
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(objTodo)
            .then(data => {
                res.status(201).json({ data })
            })
            .catch(err => {
                if(err.name === "SequelizeValidationError") {
                    res.status(400).json({error: err.errors[0].message})
                }else {
                    res.status(500).json(err)
                }
            })
    }

    static showDataTodosById(req, res) {
        let id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                if(data) {
                    res.status(200).json({ data })
                }else {
                    res.status(404).json({ error: "error not found" })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static replaceDataTodosById(req, res) {
        let id = req.params.id
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(objTodo, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                if(data[1].length >= 1) {
                    res.status(200).json({ data })
                }else if (data[1].length === 0) {
                    res.status(400).json({ error: "error not found" })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static modifyDataTodosById(req, res) {
        let id = req.params.id
        let objStatus = {
            status: req.body.status
        }

        Todo.update(objStatus, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                if(data[1].length >= 1) {
                    res.status(200).json({ data })
                }else {
                    res.status(404).json({ error: "error not found" })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static destroyDataTodosById(req, res) {
        let id = req.params.id
        Todo.destroy({
            where: {
                id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json({ The_number_of_destroyed_rows: data})
                }else {
                    res.status(404).json({ error: "error not found"})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerTodo