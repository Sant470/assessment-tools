'use strict';
module.exports = (sequelize, DataTypes) => {
  const LeaderBoard = sequelize.define('LeaderBoard', {
    userId: DataTypes.INTEGER,
    spellingScore: DataTypes.INTEGER,
    grammerScore: DataTypes.INTEGER,
    relevanceScore: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  LeaderBoard.associate = function(models) {
    // associations can be defined here
    LeaderBoard.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };
  return LeaderBoard;
};
