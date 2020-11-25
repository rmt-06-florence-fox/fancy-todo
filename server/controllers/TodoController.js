const { Todo } = require("../models")
const axios = require("axios")
const { response } = require("express")

class TodoController {

    static postTodo(req, res, next) {
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
                // if (err.name === "SequelizeValidationError") {
                //     res.status(400).json({msg: err.errors[0].message})
                // }
                next(err)
            })
    }

    static async getAllTodo(req, res, next) {
        
        Todo.findAll({where: {UserId: req.logInUser.id}})
            .then(data => {
                // res.send(data)
                if (data.length === 0) {
                    throw {
                        status: 404,
                        msg: "DataNotFound"
                    }
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                // res.send(err)
                next(err)
            })
    }

    static getTodoById(req, res) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                console.log(data)
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        msg: "DataNotFound"
                    }
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
                    throw {
                        status: 404,
                        msg: "DataNotFound"
                    }
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
                    throw {
                        status: 404,
                        msg: "DataNotFound"
                    }
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static async deleteTodoById(req, res) {
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
                    throw {
                        status: 404,
                        msg: "DataNotFound"
                    }
                } else {
                    res.status(200).json({msg: "todo success to delete"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getHolidays(req, res) {
        axios({
            url: "https://calendarific.com/api/v2/holidays",
            method: "GET",
            params: {
                api_key: process.env.CAL_SECRET,
                country: "ID",
                year: "2020",
                month: "12"
            }
        })
            .then(response   => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                next(err)
                console.log(err)
            })
    }
}

module.exports = TodoController