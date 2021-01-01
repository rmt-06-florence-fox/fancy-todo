//Authorization
const { Todo } = require('../models')
const Authorization = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: +req.params.id }
    })
    if(!todo){
      throw {
        status: 404,
        message: 'Item not found'
      }
    }else if (todo.UserId != req.loggedIn.id) {
      throw {
        status: 401,
        message: 'You are not allowed to do this action'
      }
    } else {
      next()
    }
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({
        status: 500,
        message: "Database Error"
      })
    } else {
      next(err)
    }
  }
}

module.exports = Authorization