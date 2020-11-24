const { Todo } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const checker = await Todo.findOne({ where: { id: req.params.id } })
    if (checker.UserId === req.signedInUser.id) {
      next()
    } else {
      throw {
        status: 401,
        message: `You're not belongs to this todo` 
      }
    }
  } catch (error) {
    next(error)
  }
}