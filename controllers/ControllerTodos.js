const {
    ToDo
} = require('../models/index')

const axios = require('axios')

class ControllerTodos {

    static showCovid(req, res, next) {
        axios({
            url: 'https://covid-api.mmediagroup.fr/v1/cases?country=Indonesia',
            method: 'GET'
        })
        .then(response => {
            res.status(200).json(response.data.All);
        })
        .catch(err => {
            next(err)
        })
    }

    static showToDos(req, res, next) {
        ToDo.findAll({
                where: {
                    UserId: req.loggedInUser.id,
                    due_date: new Date()
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                // res.status(500).json('Internal Server Error!')
                next(err)
            })
    }

    static showAllToDos(req, res, next) {
        ToDo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addToDo(req, res, next) {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        ToDo.create(payload)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                // if (err.message == `Can't input date before today!`) {
                //     res.status(400).json(err.message)
                // } else {
                //     res.status(500).json('Internal Server Error!')
                // }
                next(err)
            })
    }

    static showToDosById(req, res, next) {
        console.log(req.params.id);
        const id = req.params.id

        ToDo.findOne({
                where: {
                    id
                }
            })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    // res.status(404).json('Error! Data not found!')
                    throw ({
                        status: 404,
                        message: 'Error! Data not found!'
                    })
                }
            })
            .catch(err => {
                // console.log(err);
                // res.status(500).json('Internal Server Error!')
                next(err)
            })
    }

    static editToDo(req, res, next) {
        const id = req.params.id
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        ToDo.findOne({
                where: {
                    id
                }
            })
            .then(data => {
                if (data) {
                    return ToDo.update(payload, {
                        where: {
                            id
                        },
                        returning: true
                    })
                } else {
                    // res.status(404).json('Error! Data not found!')
                    throw ({
                        status: 404,
                        message: 'Error! Data not found!'
                    })
                }
            })
            .then(result => {
                res.status(200).json(result[1][0])
            })
            .catch(err => {
                // if(err.message === `Can't input date before today!`) {
                //     res.status(400).json(err.message)
                // } else {
                //     console.log(err);
                //     // res.status(500).json('Internal Server Error!')
                //     next(err)
                // }
                next(err)
            })
    }

    static updateStatus(req, res, next) {
        const id = req.params.id

        const payload = {
            status: req.body.status
        }

        ToDo.findOne({
                where: {
                    id
                }
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    return ToDo.update(payload, {
                        where: {
                            id
                        },
                        returning: true
                    })
                } else {
                    // res.status(404).json('Error! Data not found!')
                    throw ({
                        status: 404,
                        message: 'Error! Data not found!'
                    })
                }
            })
            .then(data => {
                // console.log(data);
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteToDo(req, res, next) {
        const id = req.params.id

        ToDo.findByPk(id)
            .then(data => {
                if (data) {
                    return ToDo.destroy({
                        where: {
                            id
                        },
                        returning: true
                    })
                } else {
                    // res.status(404).json('Error! Data not found!')
                    throw ({
                        status: 404,
                        message: 'Error! Data not found!'
                    })
                }
            })
            .then(data => {
                res.status(200).json({
                    message: 'Deleted ToDo successfully'
                })
            })
            .catch(err => {
                next(err);
                // res.status(500).json('Internal Server Error!')
            })
    }
}

module.exports = ControllerTodos