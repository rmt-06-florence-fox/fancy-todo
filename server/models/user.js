'use strict';

const { hashPassword } = require('../helpers/bcrypt');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Todo);
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Email Cannot be Empty',
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Username Cannot be Empty',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Password Cannot be Empty',
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					instance.password = hashPassword(instance.password);
				},
			},
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
