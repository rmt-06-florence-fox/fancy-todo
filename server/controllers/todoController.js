const { Todo } = require("../models/index")

class ControllerTodo {
    static showAllDataTodos(req, res, next) {
        // console.log(req.dataLoginUser, "------") // ini cara mendapatkan data yang dilempar dari authentication (mention req yang dibuat di authentication)
        let UserId = req.dataLoginUser.id       
        Todo.findAll({
            where: {
                UserId // sekarang hanya show data yang dimiliki UserId
            }
        })
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                next(err)
            })
    }

    static addDataTodos(req, res, next) {
        // console.log(req.dataLoginUser, "------") // ini cara mendapatkan data yang dilempar dari authentication (mention req yang dibuat di authentication)
        let objTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.dataLoginUser.id
        }

        Todo.create(objTodo)
            .then(data => {
                console.log(data)
                res.status(201).json({ data })
            })
            .catch(err => {
                if(err.name === "SequelizeValidationError") {
                    throw {
                        status: 400,
                        message: {error: err.errors[0].message}
                    }
                    
                }else {
                    next(err)
                }
            })
    }

    static showDataTodosById(req, res, next) {
        // let id = req.params.id
        let UserId = req.dataLoginUser.id
        let id = req.params.id
        Todo.findOne({
            where: {
                id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json({ data })
                }else {
                    throw {
                        status: 404,
                        message: { error: "error not found" }
                    }
                    // res.status(404).json({ error: "error not found" })
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json(err)
            })
    }

    static replaceDataTodosById(req, res, next) {
        let id = req.params.id
        let UserId = req.dataLoginUser.id
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
                    throw {
                        status: 400,
                        message: { error: "error not found" }
                    }
                    // res.status(400).json({ error: "error not found" })
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json(err)
            })
    }

    static modifyDataTodosById(req, res, next) {
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
                    throw {
                        status: 404,
                        message: { error: "error not found" }
                    }
                    // res.status(404).json({ error: "error not found" })
                }
            })
            .catch(err => {
                next(err)
                // res.status(500).json(err)
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
                    throw {
                        status: 404,
                        message: { error: "error not found" }
                    }
                    // res.status(404).json({ error: "error not found"})
                }
            })
            .catch(err => {
                next(err)
                // console.log(err)
                // res.status(500).json(err)
            })
    }

}

module.exports = ControllerTodo