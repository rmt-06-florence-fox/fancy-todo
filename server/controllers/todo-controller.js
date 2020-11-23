const { Todo } = require("../models");

class TodoController {
  static postTodo(req, res) {
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    })
      .then((data) => {
        if (!data) {
          res.status(400).json({ message: "Validation Error" });
        } else {
          res.status(201).json(data);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getTodo(req, res) {
    Todo.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getTodoId(req, res) {
    Todo.findByPk(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "Error Not Found" });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static putTodoId(req, res) {
    Todo.update(
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
      },
      { where: { id: req.params.id }, returning: true }
    )
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "Error Not Found" });
        }
      })
      .catch((err) => {
        let arr = [];
        for (let i = 0; i < err.errors.length; i++) {
          arr.push(err.errors[i].message);
        }
        if (arr.length > 0) {
          res.status(400).json({ error: arr.join(",") });
        } else {
          res.status(500).json(err);
        }
      });
  }

  static patchTodoId(req, res) {
    Todo.update(
      {
        status: req.body.status,
      },
      { where: { id: req.params.id }, returning: true }
    )
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "Error Not Found" });
        }
      })
      .catch((err) => {
        let arr = [];
        for (let i = 0; i < err.errors.length; i++) {
          arr.push(err.errors[i].message);
        }
        if (arr.length > 0) {
          res.status(400).json({ error: arr.join(",") });
        } else {
          res.status(500).json(err);
        }
      });
  }

  static deleteTodoId(req, res) {
    Todo.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data) {
          res.status(200).json({ message: "todo succes to delete" });
        } else {
          res.status(404).json({ message: "Object Not Found" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = TodoController;
