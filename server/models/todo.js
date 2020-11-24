'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Todo.belongsTo(models.User);
		}
	}
	Todo.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Title Cannot be Empty',
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Description Cannot be Empty',
					},
				},
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Status Cannot be Empty',
					},
				},
			},
			due_date: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Due Date Cannot be Empty',
					},
				},
			},
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Todo',
		}
	);
	return Todo;
};
