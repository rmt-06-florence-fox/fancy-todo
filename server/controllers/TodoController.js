const { Todo, User } = require("../models");

class TodoController {
  static async add(req, res, next) {
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loggedInUser.id,
    };
    try {
      let data = await Todo.create(obj);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async show(req, res, next) {
    try {
      let data = await Todo.findAll({ where: { UserId: req.loggedInUser.id } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async find(req, res, next) {
    let id = +req.params.id;
    try {
      let data = await Todo.findOne({ where: { id } });
      if (data) {
        res.status(200).json(data);
      } else {
        throw {
          status: 404,
          message: "Error, Data Not Found!",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    let id = +req.params.id;
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    };
    try {
      let data = await Todo.findOne({ where: { id } });
      if (data) {
        let dataUpdated = await Todo.update(obj, {
          where: { id },
          returning: true,
        });
        if (!dataUpdated) {
          next(error);
        } else {
          res.status(200).json(dataUpdated[1][0]);
        }
      } else {
        throw {
          status: 404,
          message: "Error, Data Not Found!",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatus(req, res, next) {
    let id = +req.params.id;
    let obj = {
      status: req.body.status,
    };
    try {
      let data = await Todo.findOne({ where: { id } });
      if (data) {
        let dataUpdated = await Todo.update(obj, {
          where: { id },
          returning: true,
        });
        if (!dataUpdated) {
          res.status(400).json({ message: "Validation Errors" });
        } else {
          res.status(200).json(dataUpdated[1][0]);
        }
      } else {
        res.status(404).json({ message: "Error, Data Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const id = +req.params.id;
      const data = await Todo.findOne({ where: { id } });
      if (!data) {
        throw {
          status: 404,
          message: "Error, Data Not Found!",
        };
      } else {
        await Todo.destroy({
          where: {
            id,
          },
        });
        res.status(200).json({ message: "todo success to delete" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
