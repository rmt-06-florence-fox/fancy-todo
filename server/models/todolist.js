'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TodoList.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Tidak boleh kosong'
        }
      }
    },
    desrcription: DataTypes.STRING,
    status: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'Tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Tidak boleh kosong'
        }
      },
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Hanya boleh format tanggal'
        }, 
        notNull: {
          msg: 'Tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Tidak boleh kosong'
        },
        checkDate (value) {
          const now  = new Date ()
          if (value < now) {
              throw new Error ('Tanggal harus lebih besar dari sekarang')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};