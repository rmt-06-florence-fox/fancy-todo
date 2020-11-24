const { Todo } = require("../models");

class TodoController {
    static add(req, res) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Todo.create(obj)
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    let errors = [];
                    let messages = [];
                    for (let i = 0; i < err.errors.length; i++) {
                        if(!errors.includes(err.errors[i].message)) {
                            errors.push(err.errors[i].message);
                            messages.push({ message: err.errors[i].message });
                        }
                    }
                    res.status(400).json(messages);
                } else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
            })
    }

    static read(req, res) {
        Todo.findAll({
            order: [["due_date", "ASC"]] 
        })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal Server Error" });
            });
    }

    static findByPk(req, res) {
        const id = Number(req.params.id);
        Todo.findByPk(id)
            .then((data) => {
                if (data === null) {
                    res.status(404).json({ message: "Data is not found." })
                } else {
                    res.status(200).json(data);
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal Server Error" });
            });
    }

    static async put(req, res) {
        try {
            const id = Number(req.params.id);
            const obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const todo = await Todo.update(obj, {
                where: {
                    id
                },
                returning: true
            });
            if (todo[0] === 0) {
                res.status(404).json({ message: "Data is not found." })
            } else {
                res.status(200).json(todo[1][0]);
            }
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                let errors = [];
                let messages = [];
                for (let i = 0; i < err.errors.length; i++) {
                    if(!errors.includes(err.errors[i].message)) {
                        errors.push(err.errors[i].message);
                        messages.push({ message: err.errors[i].message });
                    }
                }
                res.status(400).json(messages);
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    static async patch(req, res) {
        try {
            const id = Number(req.params.id);
            const obj = {
                status: req.body.status,
            }
            const todo = await Todo.update(obj, {
                where: {
                    id
                },
                returning: true
            });
            if (todo[0] === 0) {
                res.status(404).json({ message: "Data is not found." })
            } else {
                res.status(200).json(todo[1][0]);
            }
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                let errors = [];
                let messages = [];
                for (let i = 0; i < err.errors.length; i++) {
                    if(!errors.includes(err.errors[i].message)) {
                        errors.push(err.errors[i].message);
                        messages.push({ message: err.errors[i].message });
                    }
                }
                res.status(400).json(messages);
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const todo = await Todo.destroy({
                where: {
                    id
                },
            });
            if (todo === 0) {
                res.status(404).json({ message: "Data is not found." })
            } else {
                res.status(200).json({ message: "The todo has been successfully deleted." });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = TodoController;