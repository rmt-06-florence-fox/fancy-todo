'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsToMany(models.Todo,{through : "ProjectUser"})
      Project.hasMany(models.Todo , {foreignKey : "ProjectId", sourceKey: "id"})
      // define association here
    }
  };
  Project.init({
    name: DataTypes.STRING,
    due_date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};