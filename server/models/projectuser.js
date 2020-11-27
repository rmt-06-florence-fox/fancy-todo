'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectUser.belongsTo(models.Project)
      ProjectUser.belongsTo(models.User)

      // define association here
    }
  };
  ProjectUser.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectUser',
  });
  return ProjectUser;
};