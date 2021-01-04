const {Todo} = require('../models')

module.exports = async (req,res,next) => {
  try {
    let paramsId = req.params.id
    let loginId = req.userLogin.id
    const findTodo = await Todo.findOne({where : {id : paramsId}})
    if (findTodo) {
      if (findTodo.UserId === loginId) {
        next()
      } else {
        throw {
          status : 401,
          message: `Sorry, you don't have authorization to get in this page`
        }
      }
    } else {
      throw {
        status : 404,
        message: `error not found`
      }
    }
  } catch (error) {
    next(error)
  }
}