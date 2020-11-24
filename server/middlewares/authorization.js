const { Todo } = require("../models");

async function authorization(request, response, next) {
    try {
        const id = +request.params.id;
        const data = await Todo.findByPk(id)
        if(!data) {
            console.log("Data not Found");
            response.status(404).json({ message:"Data not Found" })
            //throw { name: 'NotFound' }
        } else if(data.UserId === request.loggedInUser.id) {
            next();
        } else {
            console.log("Unauthorized");
            response.status(401).json({ message:"Unauthorized" })
            //throw{ name: 'Unauthorized' }
        }
    } catch(error) {
        next(error);
    }
}

module.exports = authorization;