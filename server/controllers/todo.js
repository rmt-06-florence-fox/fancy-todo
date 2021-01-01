const { Todo } = require('../models')

class TodoController {
  static async create(req, res, next) {
    let newTodo = {
      name: req.body.name,
      description: req.body.description,
      due: req.body.due,
      status: req.body.status,
      category: req.body.category,
      UserId: req.loggedIn.id
    }
    try {
      let todo = await Todo.create(newTodo)
      res.status(201).json(todo)
    } catch (err) {
      next(err)
    }
  }
  static async getAll(req, res, next) {
    try {
      let todos = await Todo.findAll({
        where: {
          UserId: req.loggedIn.id
        },
        order: [['due', 'ASC']]
      });
      res.status(200).json(todos)

    } catch (err) {
      next(err)
    }

  }
  static async getById(req, res, next) {
    let id = +req.params.id
    try {
      let todo = await Todo.findByPk(id);
      if (todo) {
        res.status(200).json(todo)
      } else {
        throw {
          status: 404,
          message: "Item not found"
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static async change(req, res, next) {
    const id = +req.params.id
    let dataChange = {
      name: req.body.name,
      description: req.body.description,
      due: req.body.due,
      status: req.body.status,
      category: req.body.category,
      UserId: req.loggedIn.id
    }
    try {
      let todo = await Todo.findByPk(id);
      if (!todo) {
        throw {
          status: 404,
          message: "Item not found"
        }
      }else{ 
        let change = await Todo.update(dataChange,{
          where:{id},
          returning: true
        })
        todo=change[1][0]
        res.status(200).json(todo)
      }
    } catch (err) {
      next(err)
    }
  }
  static async update(req, res,next) {
    let id = +req.params.id
    let status= req.body.status
    try {
      let todo = await Todo.findByPk(id);
      if (!todo) {
        throw {
          status: 404,
          message: "Item not found"
        }
      } else if(!status){
        throw{
          status: 400,
          message: "Please fill status column"
        }
      }else{ 
        let update = await Todo.update({status},{
          where:{id},
          returning: true
        })
        todo=update[1][0]
        res.status(200).json(todo)
      }
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = +req.params.id
      const todo = await Todo.findByPk(id)
      if (todo) {
        await Todo.destroy({
          where: { id },
          returning: true
        });
        res.status(200).json({ message: `Todo success to delete`, todo })

      } else {
        throw { status: 404, message: "Item not found" }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TodoController