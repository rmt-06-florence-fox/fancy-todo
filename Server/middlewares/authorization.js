const {Todo} = require('../models')

module.exports = async (req, res, next)=>{
  try{
    // console.log(req.params.id, '<<<< id movie');
    // console.log(req.loginUser, '<<< User di authorization');
    const data = await Todo.findOne({
      where: {
        id: req.params.id,
        UserId: req.loginUser.id
      }
    })
    if(data) next()
    else res.status(401).json({msg: `You aren't authorized to access this todo`})
  }catch(err){
    res.status(500).json({msg: 'Tidak bisa authorization'})
  }
}