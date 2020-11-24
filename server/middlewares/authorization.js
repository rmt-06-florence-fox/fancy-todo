const { Todo } = require('../models/index')

async function authorization (req, res, next) {
    try {
        const { id } = req.params.id
        const todos = await Todo.findByPk(id)
        if(!todos) {
            throw {
                message: 'Todo not Found'
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
        res.status(500).json(error)
    }
}

module.exports = authorization