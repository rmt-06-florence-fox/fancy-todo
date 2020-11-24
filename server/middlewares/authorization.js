const { Todo } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const checker = await Todo.findOne({ where: { id: req.params.id } })
    if (checker.UserId === req.signedInUser.id) {
      next()
    } else {
      res.status(401).json({ message: `You're not belongs to this todo` })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}