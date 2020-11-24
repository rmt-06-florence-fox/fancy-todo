const { Todo } = require("../models")

class TodoController {

    static postTodo(req, res) {
        // console.log("success")
        // console.log(req.body)
        // console.log(req.logInUser)
        // res.status(201).json({message: "masuk create"})
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.logInUser.id
        }

        Todo.create(payload)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json({msg: err.errors[0].message})
                }
                res.status(500).json(err)
            })
    }

    static getAllTodo(req, res) {
        Todo.findAll({where: {UserId: req.logInUser.id}})
            .then(data => {
                // res.send(data)
                if (data.length === 0) {
                    res.status(404).json({msg: "data not found"})
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                // res.send(err)
                res.status(400).json(err)
            })
    }

    static getTodoById(req, res) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({msg: "data not found"})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateTodoById(req, res) {
        res.json({msg: "test"})
        // const editPayload = {
        //     title: req.body.title,
        //     description: req.body.description,
        //     status: req.body.status,
        //     due_date: req.body.due_date
        // }
        
        // const id = req.params.id
        // Todo.update(editPayload, {
        //     where: {
        //         id: id
        //     },
        //     returning: true
        // }
        // )
        //     .then(data => {
        //         // console.log(data)
        //         if (!data[1][0]) {
        //             res.status(404).json({msg: "data not found"})
        //         } else {
        //             res.status(200).json(data[1][0])
        //         }
        //     })
        //     .catch(err => {
        //         if (err.name === "SequelizeValidationError") {
        //             res.status(400).json({msg: err.errors[0].message})
        //         }
        //         res.status(500).json(err)
        //     })
    }

    static updateSpesificTodoById(req, res) {
        const id = req.params.id

        Todo.update({status: req.body.status}, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                // console.log(data)
                if (!data[1][0]) {
                    res.status(404).json({msg: "data not found"})
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json({msg: err.errors[0].message})
                }
                res.status(500).json(err)
            })
    }

    static deleteTodoById(req, res) {
        const id = req.params.id

        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        
        Todo.destroy({
            where: {
                id
            }
        })
            .then(data => {
                // console.log(data)
                if (!data) {
                    res.status(404).json({msg: "data not found"})
                } else {
                    res.status(200).json({msg: "todo success to delete"})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController