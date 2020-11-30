const { ToDo } = require('../models')

class ToDoController {
  
  static async listAll (req, res, next) {
    try {
      const UserId = req.loggedUser.id
      const output = await ToDo.findAll({
        where: {id : UserId}
      })
      res.status(200).json({data: output})
    }
    catch (err) {
      next(err)
    }
  }

  static async createToDo (req, res, next) {
    try {
      const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.loggedUser.id
      }
      const output = await ToDo.create(todo);
      res.status(201).json(output)
    }
    catch(err) {
      if(err.name === 'SequelizeValidationError') {
        next({
          name: 'Validation Error',
          status: 400,
          message: err.errors
        })
      } else {
        next(err)
      }
    }
  }
  
  static async findData (req, res, next) {
    try {
      const id = req.params.id
      const output = await ToDo.findByPk(id)
      if (output) {
        res.status(200).json({data: output})
      } else {
        throw {
          status: 404,
          message: `Not Found`
        }
      }
    }
    catch(err) {
      next(err)
    }
  }

  static async replaceData (req, res, next) {
    try {
      const id = req.params.id
      const obj = {
        title: req.body.title,
        description: req.body.description,
        status:  req.body.status,
        due_date: req.body.due_date,
        UserId: req.body.UserId 
      }
      const data = await ToDo.findByPk(id)
      if (!data) {
        throw {
          status: 404,
          message: `Data Not Found`
        }
      } else {
        const output = await ToDo.update(obj, {
          where: {id},
          returning: true
        })
        res.status(200).json({ output: output[1][0] })
      }
    }
    catch(err) {
      next(err)
    }
  }

  static async edit (req, res, next) {
    try {
      const id = req.params.id
      const obj  = {
        status: req.body.status
      }
      const data = await ToDo.findByPk(id)
      if (!data) {
        throw {
          status: 404,
          message: `Data Not Found`
        }
      } else {
        const output = await ToDo.update(obj, {
          where: {id},
          returning: true
        })
        res.status(200).json({ output: output[1][0] })
      }
    }
    catch(err) {
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id
      const data = await ToDo.findByPk(id)
      if (!data) {
        throw {
          status: 404,
          message: `Data Not Found` 
        }
      } else {
        const output = await ToDo.destroy({
          where: {id}
        })
        res.status(200).json({ message: `Task has been successfully deleted`})
      }
    }
    catch(err) {
      next(err)
    }
  }

}

module.exports = ToDoController