const { TodoList } = require('../models');
const axios = require('axios');

class ControllerTodo {
	static async get(req, res) {
		try {
			const list = await TodoList.findAll({
				where: {
					UserId: req.loggedUser.id
				}
			});
			res.status(200).json({ list });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	static async post(req, res) {
		let newList = req.body
		newList.UserId = req.loggedUser.id
		try {
			const list = await TodoList.create(newList, {
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

	static async suggest (req, res) {
		try {
			const randomAct = await axios.get(process.env.RANDOM)
			console.log(randomAct)
			res.status(200).json({try: randomAct.data})
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}

module.exports = ControllerTodo;
