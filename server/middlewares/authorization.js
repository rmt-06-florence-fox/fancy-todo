const {Todo, User} = require('../models/index')
module.exports = async (req, res, next) => {
    const todoId = req.params.id
    try {
        const todo = await Todo.findOne({
            where: {
                id: todoId
            }
        })
        if (todo.UserId == req.loginUser.id) {
            next()
        }else{
            throw {
                status: 401,
                message: `you are not authorization`
            }
        }
    } catch (error) {
       next(error)
    }
}