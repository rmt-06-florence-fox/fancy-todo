const { Todo } = require('../models')

module.exports = (req,res,next) => {
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                if (data.UserId == req.loggedInUser.id){
                    console.log('bisa masuk')
                } else {
                    res.status(401).json({message: 'you are not authorize with this todo'})
                }
            } else {
                res.status(404).json({message: 'todo id not found'})
            }

        })
        .catch(error => {

        })
}