const { Todo } = require('../models')

module.exports = async(req, res, next) => {
    try{
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(todo.UserId == req.loggedInUser.id){
            next()
        } else {
            res.status(401).json({msg: 'you cannot access this data'})
        }
    } catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}