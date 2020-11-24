const { Todo } = require("../models");
const axios = require('axios')

class TodoController {
  static async create(req, res, next) {
    try {
      const newData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.loggedin.id
      }
      const dataTodo = await Todo.create(newData)
      res.status(201).json(dataTodo)
    } catch (error) {
      next(error)
    }
  }

  static async read(req, res, next) {
    try {
      const data = await Todo.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }

  static async findId(req, res, next) {
    try {
      const id = +req.params.id;
      const data = await Todo.findByPk(id);
      if (!data) {
        throw {
          status: 404,
          message: "data not found"
        }
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error)
    }
  }

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
          message: "data not found"
        }
      } else {
        res.status(200).json(data[1][0]);
      }
    } catch (error) {
      next(error)
    }
  }

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
          message: "data not found"
        }
      } else {
        res.status(200).json(data[1][0]);
      }
    } catch (error) {
      next(error)
    }
  }

  static delete(req, res, next) {
    const id = +req.params.id;
    Todo.findByPk(id)
      .then(() => {
        if (!id) {
          throw {
            status: 404,
            message: "data not found"
          }
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
        next(error)
      });
  }

  // static async delete(req, res) {
  //   try {
  //     const id = +req.params.id;
  //     const data = await Todo.destroy({
  //       id: id,
  //     });
  //     if (!data) {
  //       res.status(404).json({ msg: "data not found!" });
  //     } else {
  //       res.status(200).json({ msg: "todo success to delete" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ msg: "Internal Server Error" });
  //   }
  // }

  //3rd API
  static solat(req, res, next) {
    axios({
      method: 'GET',
      url: `https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/${new Date().toISOString().split('T')[0]}`
      //
    })
      .then((data) => { 
        console.log(data.data)
        res.status(200).json(data.data.jadwal.data)
      })
      .catch((error) => {
        next(error)
      })
  }

  // static async solat(req, res) {
  //   try {
  //     const dataSolatbro = await axios({
  //       method: 'GET',
  //       url: `https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/2020-11-25`,
  //     });
  //     //${new Date().toISOString.split('T')[0]}
  //     console.log(dataSolatbro)
  //     res.send(200).json(dataSolatbro)
  //   } catch (error) {
  //     res.send(500).json({ msg: "internal server error" })
  //   }
  // }
}

module.exports = TodoController;
