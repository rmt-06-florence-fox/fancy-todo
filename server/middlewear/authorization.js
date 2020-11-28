const {ToDo} = require('../models')
module.exports = async (req, res, next) => {
    let idTodo = req.params.id
    let user = req.activeUser
    try {
      const data = await ToDo.findByPk(idTodo)
      if (data.userId == user.id){
        next()
      } else {
          throw{
              status : 401,
              msg : 'Unauthorized'
          }
      }
    } catch (err) {
        next(err)
    }
}