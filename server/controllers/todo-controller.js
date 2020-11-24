const { Todo } = require("../models");

class TodoController {
  static postTodo(req, res, next) {
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.userData.id,
    })
      .then((data) => {
        if (!data) {
          throw {
            status: 400,
            message: "Validation Error",
          };
        } else {
          res.status(201).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTodo(req, res, next) {
    Todo.findAll({ where: { UserId: req.userData.id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTodoId(req, res, next) {
    Todo.findByPk(req.params.id)
      .then((data) => {
        if (!data) {
          throw {
            status: 404,
            message: "Error Not Found",
          };
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static putTodoId(req, res, next) {
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
          throw {
            status: 404,
            message: "Error Not Found",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static patchTodoId(req, res, next) {
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
          throw {
            status: 404,
            message: "Error Not Found",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTodoId(req, res, next) {
    Todo.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data) {
          res.status(200).json({ message: "todo success to delete" });
        } else {
          throw {
            status: 404,
            message: "Object Not Found",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodoController;
