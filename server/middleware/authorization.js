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
      throw{
        status: 401,
        message: "unauthorized ID"
      }
      // res.status(401).json({
      //   message: "unauthorized ID"
      // })
    }
  } catch (err) {
    next(err)
    // res.status(500).json(err)
  }
  
}