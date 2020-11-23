const { Todo, User } = require("../models");

class TodoController {
  static async add(req, res) {
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: new Date(req.body.due_date),
      UserId: +req.body.UserId,
    };
    try {
      let data = await Todo.create(obj);
      if (!data) {
        res.status(400).json({ message: "Validation Errors" });
      } else {
        res.status(201).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async show(req, res) {
    try {
      let data = await Todo.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async find(req, res) {
    let id = +req.params.id;
    try {
      let data = await Todo.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "Error, Data Not Found!" });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async update(req, res) {
    let id = +req.params.id;
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    };
    try {
      let data = await Todo.findByPk(id);
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
      res.status(500).json(error);
    }
  }
  static async updateStatus(req, res) {
    let id = +req.params.id;
    let obj = {
      status: req.body.status,  
    };
    try {
      let data = await Todo.findByPk(id);
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
      res.status(500).json(error);
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const data = await Todo.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "Error, Data Not Found!" });
      } else {
        await Todo.destroy({
          where: {
            id,
          },
        });
        res.status(200).json({ message: "todo success to delete" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = TodoController;
