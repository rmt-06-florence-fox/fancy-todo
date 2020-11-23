const { Todo, User } = require('../models')

class Controller {
    static home(req, res) {
        res.send('hellooooo')
    }
}


module.exports = Controller