
module.exports = async (req, res, next) => {
    const todoId = req.paramas.id
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