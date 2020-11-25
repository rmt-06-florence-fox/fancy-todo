const { Todo } = require('../models/index.js');

class TodoController {
    static createTodo(req, res, next) {
        //console.log(req.loggedInUser)       
        Todo.create({
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          due_date: req.body.due_date,
          UserId: req.loggedInUser.id
        })
        .then(data => {
            if (data) {
                res.status(201).json(data);
            } 
            else {
                throw {
                    status: 400,
                    message: 'validation errors'
                }             
            }
        })
        .catch(err => {
            next(err)
        });
    }

    static showTodo(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.loggedInUser.id
            }
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err)
        });
    }
    
    static showTodoById(req, res, next) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } 
            else {
                throw {
                    status: 404,
                    message: 'error not found'
                }            
            }
        })
        .catch(err => {
            next(err)
        });
    }

    static replaceTodo(req, res, next) {
        Todo.update(
          {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
          },
          { where: { id: req.params.id }, 
          returning: true }
        )
        .then(data => {
            console.log(data)
            if (data) {
                res.status(200).json(data[1][0]);
            } 
            else {
                throw {
                    status: 404,
                    message: 'error not found'
                }
            }
        })
        .catch(err => {
            next(err)
        });        
    }

    static modifyTodo(req, res, next) {
        Todo.update(
            {
                status: req.body.status
            },
            { where: { id: req.params.id },
            returning: true }
        )
        .then(data => {
            if (data) {
                res.status(200).json(data[1][0]);
            } 
            else {
                throw {
                    status: 404,
                    message: 'error not found'
                }
            }
        })
        .catch(err => {
            next(err)
        });
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({ where: { id: req.params.id } })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'todo success to delete' });
            } 
            else {
                throw {
                    status: 404,
                    message: 'error not found'
                }
            }
        })
        .catch(err => {
            next(err)
        });
    }
}

module.exports = TodoController;