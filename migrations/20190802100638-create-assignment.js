'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      maxMark: {
        type: Sequelize.INTEGER
      },
      problemText: {
        type: Sequelize.TEXT
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addIndex('Assignments', ['userId']);
      queryInterface.addConstraint('Assignments', ['userId', 'title'], { type: 'unique', name: 'userid_title'}); 
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Assignments');
  }
};
