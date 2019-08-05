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
    creatorId: DataTypes.INTEGER,
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
    User.hasMany(models.Assignment, {as: 'assignments', foreignKey: 'creatorId'})
    User.belongsToMany(models.Assignment, {
      through: 'UserAssignments',
      foreignKey: 'userId',
      as: 'assesments'
    });
    User.hasMany(models.Submission, {as: 'submissions'});
    User.hasOne(models.LeaderBoard, {as: 'leaderboard'});
  };

  User.prototype.generateAuthToken = function(){
    return jwt.sign({id: this.id, email: this.email, name: this.name, userType: this.userType}, 'privatekey')
  }
  return User;
};
