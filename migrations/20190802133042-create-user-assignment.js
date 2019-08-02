'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserAssignments', {
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
      assignmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assignments',
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
    }).then(()=>{
      queryInterface.addIndex('UserAssignments', ['userId', 'assignmentId']);
      queryInterface.addConstraint('UserAssignments', ['userId', 'assignmentId'], { type: 'unique', name: 'uniqe_assignment_per_student'});
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserAssignments');
  }
};
