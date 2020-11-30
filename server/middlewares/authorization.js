const {Todo} = require('../models/index');

async function authorization(req, res, next) {
    const id = +req.params.id;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return next({
                name: 'NotFound',
                msg: 'Error Not Found!'
            })
        } else if (todo.UserId === req.loggedInUser.id) {
            next();
        } else {
            return next({
                name: 'NotAuthorized',
                msg: 'Not Authorized!'
            }) 
        } 
    } catch (err) {
        return next({
            name: 'InternalServerError',
            msg: err.message
        })
    }
}

module.exports = authorization