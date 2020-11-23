const { Todo } = require("../models");

class TodoController {
  static async create(req, res) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
      };
      const data = await Todo.create(payload);
      res.status(201).json(data);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json(error);
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }

  static async read(req, res) {
    try {
      const data = await Todo.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async findId(req, res) {
    try {
      const id = +req.params.id;
      const data = await Todo.findByPk(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ msg: "data not found" });
    }
  }

  static async updateAll(req, res) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
      };
      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id,
        },
        returning: true,
      });
      if (!data) {
        throw error;
      } else {
        res.status(200).json(data[1][0]);
      }
    } catch (error) {
      res.status(404).json({ msg: "data not found" });
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async updateStatus(req, res) {
    try {
      const payload = {
        status: req.body.status,
      };
      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      if (!data) {
        throw error;
      } else {
        res.status(200).json(data[1][0]);
      }
    } catch (error) {
      res.status(404).json({ msg: "data not found" });
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static delete(req, res) {
    const id = +req.params.id
      Todo.findByPk(id)    
        .then(() => { 
          if (!id) {
            res.status(404).json({ msg: "data not found" });
          } else {
            Todo.destroy({
              where: {
                id: id
              }
            })
            res.status(200).json({ msg: "todo success to delete" })
          }
        }) 
        .catch((err) => { 
          res.status(500).json({ msg: "Internal Server Error" });
        })
  }

  // static async delete(req, res) {
  //   try {
  //     const id = +req.params.id
  //     const data = await Todo.destroy({
  //       id: id
  //     });
  //     res.status(200).json({ data, msg: "todo success to delete" });
  //     // if (id) {
  //     // } else {
  //     //   throw error;
  //     // }
  //   } catch (error) {
  //     res.status(404).json({ msg: "data not found" });
  //     res.status(500).json({ msg: "Internal Server Error" });
  //   }
  // }
}

module.exports = TodoController;
