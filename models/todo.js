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
      ToDo.belongsTo(models.User, { foreignKey: "UserId", targetKey: "id" })
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: function(value) {
          if(value == '' || value == undefined) {
            throw new Error('Title harus diisi!')
          }
        }
      }
    }, 
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
          if(value < new Date) {
            throw new Error('Tanggal tidak boleh yang sudah dilewati hari ini!')
          }
        },
        isNull: function(value) {
          if(value == null || value == undefined) {
            throw new Error('Tanggal harus diisi!')
          }
        } 
      }
    },
    UserId: DataTypes.INTEGER
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