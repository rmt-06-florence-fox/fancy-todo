const {Todo} = require('../models')

module.exports = async (req, res, next)=>{
  try {
    console.log("middleware athorization");
    console.log(req.params.id);
    console.log(req.currentUser);
    const todo = await Todo.findOne({
      where:{
        id: req.params.id
      }
    })
    if(todo.UserId === req.currentUser.id) {
      next()
    } else {
      res.status(401).json({
        message: "unauthorized ID"
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
  
}