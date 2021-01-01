const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    try {
        console.log("AUTHORIZATION");
        const todo = await Todo.findOne({
            where: {
                id : req.params.id
            }
        })
        // console.log(todo);
        if(!todo) {
            // console.log('HUJAHUA');
            res.status(404).json({
                message: 'Data not found'
            })
        } else if (todo.UserId === req.loggedInUser.id) {
            next()
        } else {
            res.status(401).json({
                message: 'You are not authorized to perform this action!'
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err)
    }

}