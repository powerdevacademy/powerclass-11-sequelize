'use strict';
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.update({
      password: 'powerdev'
    }, {
      where: {id: 1}, 
      individualHooks: true
   });
   await User.update({
    password: 'powerwife'
  }, {
    where: {id: 2}, 
    individualHooks: true
 });
  },

  down: async (queryInterface, Sequelize) => {

  }
};
