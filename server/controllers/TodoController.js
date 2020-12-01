const { Todo } = require("../models")
const axios = require("axios")

class TodoController {

    static postTodo(req, res, next) {
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
                next(err)
            })
    }

    static async getAllTodo(req, res, next) {
        
        Todo.findAll({where: {UserId: req.logInUser.id}})
            .then(data => {
                if (data.length === 0) {
                    next({
                        name: "DataNotFound"
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getTodoById(req, res, next) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                console.log(data)
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({
                        name: "DataNotFound"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTodoById(req, res, next) {
        const editPayload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        
        const id = req.params.id
        Todo.update(editPayload, {
            where: {
                id: id
            },
            returning: true
        }
        )
            .then(data => {
                if (!data[1][0]) {
                    next({
                        name: "DataNotFound"
                    })
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateSpesificTodoById(req, res, next) {
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
                    next({
                        name: "DataNotFound"
                    })
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static async deleteTodoById(req, res, next) {
        const id = req.params.id

        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        
        Todo.destroy({
            where: {
                id,
                UserId: req.logInUser.id
            }
        })
            .then(data => {
                console.log(data)
                if (!data) {
                    next({
                        name: "DataNotFound"
                    })
                } else {
                    res.status(200).json({msg: "todo success to delete"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getHolidays(req, res, next) {
        const month = new Date().toISOString().split("T")[0].split("-")[1]
        const year = new Date().toISOString().split("T")[0].split("-")[0]
        axios({
            url: "https://calendarific.com/api/v2/holidays",
            method: "GET",
            params: {
                api_key: process.env.CAL_SECRET,
                country: "ID",
                year,
                month
            }
        })
            .then(response   => {
                res.status(200).json(response.data.response.holidays)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController