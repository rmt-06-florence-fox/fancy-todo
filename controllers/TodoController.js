const { Todo } = require('../models/index.js');

class TodoController {
    static createTodo(req, res) {
        Todo.create({
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          due_date: req.body.due_date
        })
        .then(data => {
            if (data) {
                res.status(201).json(data);
            } 
            else {
                res.status(400).json({ message: 'validation errors' });              
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }

    static showTodo(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
    
    static showTodoById(req, res) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } 
            else {
                res.status(404).json({ message: 'error not found' });             
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }

    static replaceTodo(req, res) {
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
            if (data) {
                res.status(200).json(data[1][0]);
            } 
            else {
                res.status(404).json({ message: 'error not found' });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });        
    }

    static modifyTodo(req, res) {
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
                res.status(404).json({ message: 'error not found' });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }

    static deleteTodo(req, res) {
        Todo.destroy({ where: { id: req.params.id } })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'todo success to delete' });
            } 
            else {
                res.status(404).json({ message: 'error not found' });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
}

module.exports = TodoController;