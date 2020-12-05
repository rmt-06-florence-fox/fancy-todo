const {Todo} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const id = +req.params.id
        const todo = await Todo.findByPk(id)

        // cek data todo-nya dulu
        // kalo todo-nya ada, baru cek auth
            // dicek auth-nya dengan cocokin UserId di todo
            // sama data ID dari user yang lagi login
            // kalo gk cocok, throw error 401 (AuthorizationFailed)
            // kalo ada, baru next
        // kalo todo-nya gk ada, throw error 404
        if (todo) {
            if(todo.UserId === req.loggedInUser.id) {
                next()
            } else {
                throw {
                    errorDesc : 'AuthenticationFailed'
                }
            }   
        } else {
            throw {
                errorDesc : 'NotFound'
            } 
        }

    } catch (error) {
        next(error)
        
    }
}
