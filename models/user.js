'use strict';
const { hashPassword } = require('../lib/bcrypt-client');
const jwt = require('jsonwebtoken');
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
      // validate: {
      //    is: /^[a-zA-Z]+$/ // does not allow letters
      //  }
     },
    userId: DataTypes.INTEGER,
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
    // self join
    User.belongsTo(models.User, {as: 'instructor', foreignKey: 'userId'});
    User.hasMany(models.User, {as: 'students', foreignKey: 'userId'});
    // assignments
    User.hasMany(models.Assignment, {as: 'assignments', foreignKey: 'creatorId'})
    User.belongsToMany(models.Assignment, {
      as: 'assessments',
      through: 'UserAssignments',
      foreignKey: 'userId'
    }); // accessibles as a student

    // submissions
    User.hasMany(models.Submission, {as: 'submissions', foreignKey: 'userId'});
    User.hasOne(models.LeaderBoard, {as: 'leaderboard', foreignKey: 'userId'});
  };

  User.prototype.generateAuthToken = function(){
    return jwt.sign({id: this.id, email: this.email, name: this.name, userType: this.userType}, 'privatekey')
  };
  return User;
};
