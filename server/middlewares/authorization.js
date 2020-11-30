const { Todo } = require("../models");

async function authorization(request, response, next) {
    try {
        const id = +request.params.id;
        const data = await Todo.findByPk(id);
        if(!data) {
            throw{ name: 'NotFound' }
        } else if(data.UserId === request.loggedInUser.id) {
            next();
        } else {
            throw{ name: 'Unauthorized' }
        }
    } catch(error) {
        next(error);
    }
}

module.exports = authorization;