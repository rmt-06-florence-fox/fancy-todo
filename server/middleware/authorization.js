const { Todo } = require("../models/index.js")

function authorization(req, res, next){
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(todo => {
    if(!todo){
      throw({
        status: 404,
        message: "Error! Data not found"
      })
    }
    else {
      if (todo.UserId === req.loggedInUser.id){
        next()
      }
      else {
        throw({
          status: 401,
          message: "You are not authorized to access this page"
        })
      }
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorization