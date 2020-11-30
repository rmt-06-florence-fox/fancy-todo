const {Todo} = require('../models')

module.exports = async (req, res, next)=>{
  try{
    // console.log(req.params.id, '<<<< id todo');
    // console.log(req.loginUser, '<<< User di authorization');
    const data = await Todo.findOne({
      where: {
        id: req.params.id,
        UserId: req.loginUser.id
      }
    })
    if(data) next()
    else{
      throw{
        status: 401,
        message: `You aren't authorized to access this todo`
      }
    }
  }catch(err){
    next(err)
  }
}