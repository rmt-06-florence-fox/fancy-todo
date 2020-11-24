const { Todo } = require("../models/index.js")

function authorization(req, res, next){
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(todo => {
    if(!todo){
      res.status(404).json({message: "Error! Data not found"})
    }
    else {
      if (todo.UserId === req.loggedInUser.id){
        next()
      }
      else {
        res.status(401).json({
          message: "You are not authorized to access this page"
        })
      }
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Internal Server Error"
    })
  })
}

module.exports = authorization