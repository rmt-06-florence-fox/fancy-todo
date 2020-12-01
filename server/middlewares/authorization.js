const { Todo } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const data = await Todo.findOne({
      where: {
        id: req.params.id
      }
    })
    // console.log(data.UserId);
    if (data.UserId === req.SignedIn.id) {
      next()
    } else {
      res.status(401).json({
        message: `Invalid Authentication Token`
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}