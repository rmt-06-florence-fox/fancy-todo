const { Todo } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const find = await Todo.findOne({
      where: {
        id: +req.params.id
      }
    })

    if (find.UserId === req.loggedin.id) {
      next()
    } else {
      res.status(401).json({
        msg: "You're not privileged"
      })
    }
  } catch (error) {
    res.status(500).json({ messege: "Internal Server Error" })
  }
}