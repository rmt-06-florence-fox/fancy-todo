const {Todo} = require('../models')

module.exports = async (req,res,next) => {
  try {
    let paramsId = req.params.id
    let loginId = req.userLogin.id
    const findTodo = await Todo.findOne({where : {id : paramsId}})
    if (findTodo.UserId === loginId) {
      next()
    } else {
      res.status(401).json({message : `Sorry, you don't have authorization to get in this page`})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}