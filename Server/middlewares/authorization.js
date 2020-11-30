const {Todo} = require('../models');

module.exports = async (req, res, next)=>{
    try {
        const foundTodo = await Todo.findOne({where: {id: req.params.id}})
        if(!foundTodo){
            throw {
                status: 404,
                message: "Error Not Found"
            }
        } else if(foundTodo.UserId === req.loggedIn.id){
            next();
        } else {
            throw {
                status: 401,
                message: "You are not authorized"
            }
        }
    } catch (error){
        next(error);
    }
}