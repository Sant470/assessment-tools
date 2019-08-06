'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAssignment = sequelize.define('UserAssignment', {
    userId: DataTypes.INTEGER,
    assignmentId: DataTypes.INTEGER
  }, {});
  UserAssignment.associate = function(models) {
    // associations can be defined here
    UserAssignment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    UserAssignment.belongsTo(models.Assignment, {foreignKey: 'assignmentId', as: 'assignment'});
  };
  return UserAssignment;
};
