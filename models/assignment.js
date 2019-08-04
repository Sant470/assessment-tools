'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    title: DataTypes.STRING,
    maxMark: DataTypes.INTEGER,
    problemText: DataTypes.TEXT,
    creatorId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeSave: (assignment) => {
        assignment.title = assignment.title.toLowerCase();
      }
    }
  });
  Assignment.associate = function(models) {
    Assignment.belongsTo(models.User, {as: 'creator', foreignKey: 'creatorId'});
    Assignment.belongsToMany(models.User, {
      through: 'UserAssignments',
      foreignKey: 'assignmentId'
    });
    Assignment.hasMany(models.Submission, { as: 'submissions'});
  };
  return Assignment;
};
