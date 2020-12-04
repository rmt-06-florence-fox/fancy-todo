const { Todo } = require('../models/index')

async function authorization (req, res, next) {
    const { id } = req.params
    try {
        const todos = await Todo.findByPk(id)
        if(!todos) {
            throw {
                message: 'Todo not Found', status: 404
            }
        }else if(todos.UserId === req.loggedIn.id) {
            next()
        }
        else {
            throw {
                message: 'Not Authorized', status: 401
            }
        }
    }catch(error) {
        next(error)
    }
}

module.exports = authorization
