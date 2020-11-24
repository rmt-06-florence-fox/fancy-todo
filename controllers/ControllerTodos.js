const { ToDo } = require('../models/index')

class ControllerTodos {

    static showToDos(req, res) {
        ToDo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Internal Server Error!')
        })
    }

    static addToDo(req, res) {
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
            console.log(err);
            if (err.message == `Can't input date before today!`) {
                res.status(400).json(err.message)
            } else {
                res.status(500).json('Internal Server Error!')
            }
        })
    }

    static showToDosById(req, res) {
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
                res.status(404).json('Error! Data not found!')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Internal Server Error!')
        })
    }

    static editToDo(req, res) {
        const id = req.params.id
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.dueDate
        }

        ToDo.findOne({
            where: {
                id
            }
        })
        .then(data => {
            if(data) {
                return ToDo.update(payload, {
                    where: {
                        id
                    },
                    returning: true
                })
            } else {
                res.status(404).json('Error! Data not found!')
            }
        })
        .then(result => {
            res.status(200).json(result[1][0])
        })
        .catch(err => {
            if(err.message === `Can't input date before today!`) {
                res.status(400).json(err.message)
            } else {
                res.status(500).json('Internal Server Error!')
            }
        })
    }

    static updateStatus(req, res) {
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
            if(data) {
                console.log(data);
                return ToDo.update(payload, {
                    where: {
                        id
                    },
                    returning: true
                })
            } else {
                res.status(404).json('Error! Data not found!')
            }
        })
        .then(data => {
            console.log(data);
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Internal Server Error!')
        })
    }

    static deleteToDo(req, res) {
        const id = req.params.id

        ToDo.findByPk(id)
        .then(data => {
            if(data) {
                return ToDo.destroy({
                    where : {
                        id
                    },
                    returning: true
                })
            } else {
                res.status(404).json('Error! Data not found!')
            }
        })
        .then(data => {
            res.status(200).json('Deleted ToDo successfully')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Internal Server Error!')
        })
    }
}

module.exports = ControllerTodos