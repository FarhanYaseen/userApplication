'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = "somePassword";
    const hashedPassword = await bcrypt.hash(password, 10);
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Farhan',
      lastName: 'Yaseeb',
      password: hashedPassword,
      email: 'farhan.yaseen.se@gmail.com'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
