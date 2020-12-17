const { Todo } = require("../models")

async function authorization (req, res, next) {
  try {
    const data = await Todo.findOne({
      where: {
        UserId: req.loggedUser.id
      }
    })
    console.log(req.loggedUser, '<-- dari author')
    if (!data) {
      throw {
        status: 401,
        message: `You are not authorized !`
      }
    } else {
      next()
    }
  }
  catch (err) {
    next (err)
  }
}

module.exports = authorization