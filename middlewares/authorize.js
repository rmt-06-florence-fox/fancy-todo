const { ToDo } = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const todo = await ToDo.findOne({
            where: {
                id: req.params.id
            }
        })
        // console.log(todo);
        if (todo.UserId == req.loggedInUser.id) {
            next()
        } else {
            res.status(401).json({
                message: 'You are not authorized to access the data.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status('500').json({
            message: 'Internal Server Error!'
        })
    }
}