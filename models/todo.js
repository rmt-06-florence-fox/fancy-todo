'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ToDo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isWrong: function(value) {
          if(value != 'sudah' && value != 'belum' && value != '') {
            throw new Error('Format input salah')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isNewer: function(value) {
          if(value > new Date) {
            throw new Error('Tanggal tidak boleh yang sudah dilewati hari ini!')
          }
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(instance, options) {
        instance.status = 'belum'
      }
    },
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};