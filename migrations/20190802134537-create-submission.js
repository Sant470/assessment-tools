'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Submissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assignmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assignments',
          key: 'id'
        }
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
    }).then(()=> queryInterface.addIndex('Submissions', ['userId', 'assignmentId'], {unique: true}));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Submissions');
  }
};
