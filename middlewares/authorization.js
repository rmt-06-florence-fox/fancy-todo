const {Todo} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({where:{id: +req.params.id}})
        if(todo.UserId === req.loggedInUser.id){
            next()
        } else {
            throw({message: "You are not authorized to access this todo"})
        }
    } catch (error) {
        if(error.message == "You are not authorized to access this todo"){
            res.status(401).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}