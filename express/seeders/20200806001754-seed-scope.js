'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Scopes', [
      {
        id: 1,
        name: 'Admin',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      },
      {
        id: 2,
        name: 'User',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      },
      {
        id: 3,
        name: 'Guest',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Scopes', null, {});
  }
};
