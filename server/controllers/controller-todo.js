const { TodoList } = require('../models');
const axios = require('axios');

class ControllerTodo {
	static async get(req, res, next) {
		try {
			const list = await TodoList.findAll({
				where: {
					UserId: req.loggedUser.id
				},
				order: [['due_date', 'ASC']]
			});
			res.status(200).json({ list });
		} catch (err) {
			next(err)
		}
	}

	static async post(req, res, next) {
		let newList = req.body
		newList.UserId = req.loggedUser.id
		try {
			const list = await TodoList.create(newList, {
				returning: true,
			});
			res.status(201).json({ list });
		} catch (err) {
			next(err)
		}
	}

	static async getId(req, res, next) {
		try {
			const todo = await TodoList.findByPk(req.params.id);
			res.status(201).json({ todo });
		} catch (err) {
			next(err)
		}
	}
	static async putId(req, res, next) {
		try {
			const update = await TodoList.update(req.body, {
				where: {
					id: req.params.id,
				},
				returning: true,
			});
			res.status(201).json({ update });
		} catch (err) {
			next(err)
		}
	}
	static async patchId(req, res, next) {
		try {
			let statusInput;
			const todo = await TodoList.findByPk(req.params.id);
			todo.status == true ? statusInput = false : statusInput = true
			const update = await TodoList.update(
				{ status: statusInput },
				{
					where: {
						id: req.params.id,
					},
					returning: true,
				}
			);
			res.status(201).json({ update });
		} catch (err) {
			next(err)
		}
	}
	static async deleteId(req, res, next) {
		try {
			const del = await TodoList.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.status(201).json({ message: 'item deleted' });
		} catch (err) {
			next(err)
		}
	}

	static async suggest (req, res, next) {
		try {
			const randomAct = await axios.get(process.env.RANDOM)
			res.status(200).json({try: {
				activity: randomAct.data.activity,
				type: randomAct.data.type
			}})
		} catch (err) {
			next(err)
		}
	}
}

module.exports = ControllerTodo;
