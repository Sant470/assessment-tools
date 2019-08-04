'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LeaderBoards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      spellingScore: {
        type: Sequelize.INTEGER
      },
      grammerScore: {
        type: Sequelize.INTEGER
      },
      relevanceScore: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(()=> queryInterface.addIndex('LeaderBoards', ['userId'], {unique: true}));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LeaderBoards');
  }
};
