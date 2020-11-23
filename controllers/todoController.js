const { Todo } = require('../models')

class TodoController {

    static showList(req, res){
        res.send('holaaa')
    }

}


module.exports = TodoController