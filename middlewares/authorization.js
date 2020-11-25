const { Todo } = require ("../models/index.js")

module.exports = async (req, res, next) => {
    try {
            const todo = await Todo.findOne ({
                where : {
                    id : req.params.id
                }
            })

            if (todo.UserId === req.dataUser.id) {
                next()
            }else {
                throw {
                    status : 401,
                    msg : "You are not authorize to access this To do"
                }
            }
    } catch (error) {
            next (error)
        }
    
}