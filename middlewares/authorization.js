const {Todo} = require('../models');

module.exports = async (req, res, next)=>{
    try {
        const foundTodo = await Todo.findOne({where: {id: req.params.id}})
        if(!foundTodo){
            res.status(404).json({message: "Error Not Found"});
        } else if(foundTodo.UserId === req.loggedIn.id){
            next();
        } else {
            res.status(401).json({message: "You are not authorized"})
        }
    } catch (error){
        res.status(500).json(error)
    }
}