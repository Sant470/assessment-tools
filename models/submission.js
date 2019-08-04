'use strict';
module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    userAssignmentId: DataTypes.INTEGER,
    assignmentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    spellingScore: DataTypes.INTEGER,
    grammerScore: DataTypes.INTEGER,
    relevanceScore: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Submission.associate = function(models) {
    // associations can be defined here
    Submission.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Submission.belongsTo(models.Assignment, {foreignKey: 'assignmentId', as: 'assignment'});
    Submission.belongsTo(models.UserAssignment, {foreignKey: 'userAssignmentId', as: 'user_assignment'});
  };
  return Submission;
};
