const { Todo } = require('../models');

class TodoController {
	static createTodo(req, res, next) {
		const newTodo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
			UserId: req.loggedInUser.id,
		};
		let dueDate = new Date(newTodo.due_date);
		let currentDate = new Date();
		if (dueDate < currentDate) {
			const errorName = 'DueDateMustGratherThanToday';
			next({
				name: errorName,
			});
		} else {
			Todo.create(newTodo)
				.then((data) => {
					res.status(201).json(data);
				})
				.catch((err) => {
					next(err);
				});
		}
	}

	static getTodos(req, res, next) {
		const id = req.loggedInUser.id;
		Todo.findAll({
			where: {
				UserId: id,
			},
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static getTodoId(req, res, next) {
		const id = req.params.id;
		const UserId = req.loggedInUser.id;
		Todo.findOne({
			where: {
				id: id,
			},
		})
			.then((data) => {
				console.log(data, '<<<<');
				if (!data) {
					const errorName = 'TodoNotFound';
					next({
						name: errorName,
					});
				} else if (data.UserId !== UserId) {
					const errorName = 'UnauthorizedUser';
					next({
						name: errorName,
					});
				} else {
					res.status(200).json(data);
				}
			})
			.catch((err) => {
				next(err);
			});
	}

	static editTodo(req, res, next) {
		const id = req.params.id;
		const userId = req.loggedInUser.id;
		const editTodo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
		};
		let dueDate = new Date(editTodo.due_date);
		let currentDate = new Date();

		if (dueDate < currentDate) {
			const errorName = 'DueDateMustGratherThanToday';
			next({
				name: errorName,
			});
		} else {
			Todo.findOne({
				where: {
					id: id,
				},
			})
				.then((data) => {
					console.log(data);
					if (!data) {
						const errorName = 'TodoNotFound';
						next({
							name: errorName,
						});
					} else {
						return Todo.update(editTodo, {
							where: {
								id,
							},
							returning: true,
						});
					}
				})
				.then((data) => {
					res.status(200).json(data[1][0]);
				})
				.catch((err) => {
					next(err);
				});
		}
	}

	static editStatus(req, res, next) {
		const id = req.params.id;
		const updateTodo = {
			status: req.body.status,
		};

		Todo.findByPk(id)
			.then((data) => {
				if (data) {
					return Todo.update(updateTodo, {
						where: {
							id,
						},
						returning: true,
					});
				} else {
					const errorName = 'TodoNotFound';
					next({
						name: errorName,
					});
				}
			})
			.then((data) => {
				res.status(200).json(data[1][0]);
			})
			.catch((err) => {
				next(err);
			});
	}

	static deleteTodo(req, res, next) {
		const id = req.params.id;
		Todo.findByPk(id)
			.then((data) => {
				if (data) {
					return Todo.destroy({
						where: {
							id,
						},
					});
				} else {
					const errorName = 'TodoNotFound';
					next({
						name: errorName,
					});
				}
			})
			.then((data) => {
				const message = 'todo success to delete';
				res.status(200).json({ message });
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = TodoController;
