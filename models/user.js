'use strict';
const hashPassword = require('../lib/hash-password');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
         is: /^[a-zA-Z]+$/ // does not allow letters
       }
     },
    active: DataTypes.BOOLEAN, // keep track of deleted students
    password: DataTypes.STRING,
    userType: {
      type: DataTypes.ENUM,
      values: ['I', 'L'] // I stand for Instructor and L stand for Learner
    }
  },
  {
    hooks: {
      beforeSave: (user)=>{
        user.email = user.email.toLowerCase();
        return hashPassword(user.password).then((hash) => {
          user.password = hash;
        });
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Assignment, {as: 'assignments'}); // retrive assignment created by user
    User.hasMany(models.UserAssignment, {as: 'UserAssignments'});
    User.belongsToMany(models.Assignment, {
      through: 'UserAssignments',
      foreignKey: 'userId',
      as: 'assesments'
    }); // accessible assigments as a student
    User.hasMany(models.Submission, {as: 'submissions'});
  };
  return User;
};
