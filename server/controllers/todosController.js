const {Todo} = require('../models/index');

class TodosController {
    static async addTodos(req, res, next) {
        try {
            const { title, description, status, due_date } = req.body;
            const UserId = +req.loggedInUser.id;
            const newTodo = await Todo.create({
                title,
                description,
                status,
                due_date,
                UserId
            });
            res.status(201).json(newTodo);
        } catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            const UserId = +req.loggedInUser.id;
            const todos = await Todo.findAll({
                where: {UserId}
            });
            res.status(200).json(todos);
        } catch (err) {
            next(err)
        }
    }
    static async findTodos(req, res, next) {
        try {
            let id = req.params.id;
            const todo = await Todo.findByPk(id);
            if (!todo) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(200).json(todo);
            }
        } catch (err) {
            next(err)
        }
    }
    static async updateTodos(req, res, next) {
        try {
            let id = req.params.id;
            const { title, description, status, due_date } = req.body;
            const updateTodo = await Todo.update({
                title,
                description,
                status,
                due_date
            }, {
                where: {id},
                returning: true
            });
            if (updateTodo[0] === 0) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(201).json(updateTodo[1][0]);
            }
        } catch (err) {
            next(err)
        }
    }
    static async updateStatusTodos(req, res, next) {
        try {
            let id = req.params.id;
            const {status} = req.body;
            const updateTodo = await Todo.update({
                status
            }, {
                where: {id},
                returning: true
            });
            if (updateTodo[0] === 0) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(201).json(updateTodo[1][0]);
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteTodos(req, res, next) {
        try {
            let id = req.params.id;
            const todo = await Todo.destroy({
                where: {id}
            });
            if (!todo) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(200).json({
                    message: 'Task Deleted Successfully'
                });
            }
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = TodosController;