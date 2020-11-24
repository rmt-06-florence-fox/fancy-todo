const { TodoList } = require('../models');

class ControllerTodo {
	static async get(req, res) {
		try {
			const list = await TodoList.findAll();
			res.status(200).json({ list });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	static async post(req, res) {
		try {
			const list = await TodoList.create(req.body, {
				returning: true,
			});
			res.status(201).json({ list });
		} catch (err) {
			res.status(500).json({ message: err.errors });
		}
	}

	static async getId(req, res) {
		try {
			const todo = await TodoList.findByPk(req.params.id);
			res.status(201).json({ todo });
		} catch (err) {
			res.status(500).json({ message: 'error not found' });
		}
	}
	static async putId(req, res) {
		try {
			const update = await TodoList.update(req.body, {
				where: {
					id: req.params.id,
				},
				returning: true,
			});
			res.status(201).json({ update });
		} catch (err) {
			res.status(500).json({ message: err.errors });
		}
	}
	static async patchId(req, res) {
		try {
			const update = await TodoList.update(
				{ status: true },
				{
					where: {
						id: req.params.id,
					},
					returning: true,
				}
			);
			res.status(201).json({ update });
		} catch (err) {
			res.status(500).json({ message: err.errors });
		}
	}
	static async deleteId(req, res) {
		try {
			const del = await TodoList.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.status(201).json({ message: 'item deleted' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}

module.exports = ControllerTodo;
