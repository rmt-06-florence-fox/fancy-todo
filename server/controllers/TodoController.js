const { Todo } = require("../models");
const axios = require("axios");

class TodoController {
  //create
  static async create(req, res, next) {
    try {
      const newData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.loggedin.id,
      };
      const dataTodo = await Todo.create(newData);
      res.status(201).json(dataTodo);
    } catch (error) {
      next(error);
    }
  }

  //read
  static async read(req, res, next) {
    try {
      const data = await Todo.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  //readById
  static async findId(req, res, next) {
    try {
      const id = +req.params.id;
      const data = await Todo.findByPk(id);
      if (!data) {
        throw {
          status: 404,
          message: "data not found",
        };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  //update
  static async updateAll(req, res, next) {
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
        throw {
          status: 404,
          message: "data not found",
        };
      } else {
        res.status(200).json(data[1][0]);
      }
    } catch (error) {
      next(error);
    }
  }

  // updateStatus
  static async updateStatus(req, res, next) {
    try {
      const payload = {
        status: req.body.status,
      };
      const data = await Todo.update(payload, {
        where: {
          id: +req.params.id,
        },
        returning: true,
      });
      if (!data) {
        throw {
          status: 404,
          message: "data not found",
        };
      } else {
        res.status(200).json(data[1][0]);
      }
    } catch (error) {
      next(error);
    }
  }

  //delete
  static delete(req, res, next) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then(() => {
        if (!id) {
          throw {
            status: 404,
            message: "data not found",
          };
        } else {
          return Todo.destroy({
            where: {
              id: id,
            },
          });
        }
      })
      .then(() => {
        res.status(200).json({ msg: "todo success to delete" });
      })
      .catch((error) => {
        next(error);
      });
  }

  //3rd API
  static solat(req, res, next) {
    axios({
      method: "GET",
      url: `https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/${
        new Date().toISOString().split("T")[0]
      }`,
      //
    })
      .then((data) => {
        console.log(data.data);
        res.status(200).json(data.data.jadwal.data);
      })
      .catch((error) => {
        next(error);
      });
  }
}

module.exports = TodoController;
