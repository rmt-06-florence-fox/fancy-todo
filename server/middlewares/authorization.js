const { Todo } = require('../models')

function authorization(req, res, next){
    console.log('lewat authorization');
    // console.log(req.params.id);
    // console.log(req.userLogIn.id);
    Todo.findOne({where: {
        id: req.params.id
    }})
        .then(todo => {
            if(todo.UserId == req.userLogIn.id && todo){
                next()
            } else {
                throw{
                    status: 401,
                    message: 'You are not authorized'
                }
                // res.status(401).json({msg: 'You are not authorized'})
            }
        })
        .catch(err => {
            next(err)
            // res.status(500).json(err)
        })
}

module.exports = authorization