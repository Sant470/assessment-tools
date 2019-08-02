'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    title: DataTypes.STRING,
    maxMark: DataTypes.INTEGER,
    problemText: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeSave: (assignment) => {
        assignment.title = assignment.title.toLowerCase();
      }
    }
  });
  Assignment.associate = function(models) {
    // associations can be defined here
    Assignment.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
    Assignment.hasMany(models.UserAssignment, {as: 'UserAssignments'});
    Assignment.belongsToMany(models.user, {
      through: 'UserAssignments',
      foreignKey: 'assignmentId',
      as: 'students'
    }); // accessible assigments as a student
    Assignment.hasMany(models.Submission, { as: 'submissions'});
  };
  return Assignment;
};
