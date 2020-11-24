const { Todo } = require('../models');

module.exports = async (req, res, next) => {
	try {
		const idTodo = req.params.id;
		const userId = req.loggedInUser.id;
		const todo = await Todo.findOne({
			where: {
				id: idTodo,
			},
		});
		console.log(todo);
		if (!todo.UserId) {
			const errorName = 'TodoNotFound';
			next({
				name: errorName,
			});
		} else if (todo.UserId === userId) {
			next();
		} else {
			const errorName = 'UnauthorizedUser';
			next({
				name: errorName,
			});
		}
	} catch (err) {
		next(err);
	}
};
