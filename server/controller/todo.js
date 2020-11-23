const { Todo } = require('../models');

class TodoController {
	static createTodo(req, res) {
		const newTodo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
		};
		let dueDate = new Date(newTodo.due_date);
		let currentDate = new Date();
		if (dueDate < currentDate) {
			const error = 'Due date must grather than today';
			res.status(400).json({ error });
		} else {
			Todo.create(newTodo)
				.then((data) => {
					res.status(201).json(data);
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		}
	}

	static getTodos(req, res) {
		Todo.findAll()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static getTodoId(req, res) {
		const id = req.params.id;

		Todo.findByPk(id)
			.then((data) => {
				if (!data) {
					const error = 'Todo Not Found';
					res.status(404).json({ error });
				} else {
					res.status(200).json(data);
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static editTodo(req, res) {
		const id = req.params.id;
		const editTodo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
		};
		let dueDate = new Date(editTodo.due_date);
		let currentDate = new Date();

		if (dueDate < currentDate) {
			const error = 'Due date must grather than today';
			res.status(400).json({ error });
		} else {
			Todo.findByPk(id)
				.then((data) => {
					if (data) {
						return Todo.update(editTodo, {
							where: {
								id,
							},
							returning: true,
						});
					} else {
						const error = 'Todo Not Found';
						res.status(404).json({ error });
					}
				})
				.then((data) => {
					res.status(200).json(data[1][0]);
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		}
	}

	static editStatus(req, res) {
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
					const error = 'Todo Not Found';
					res.status(404).json({ error });
				}
			})
			.then((data) => {
				res.status(200).json(data[1][0]);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static deleteTodo(req, res) {
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
					const error = 'Todo Not Found';
					res.status(404).json({ error });
				}
			})
			.then((data) => {
				const message = 'todo success to delete';
				res.status(200).json({ message });
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}

module.exports = TodoController;
