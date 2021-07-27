'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = "somePassword";
    const hashedPassword = await bcrypt.hash(password, 10);
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se1@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se2@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se3@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se4@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se5@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se6@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se7@gmail.com'
      },
      {
        firstName: 'Farhan',
        lastName: 'Yaseen',
        password: hashedPassword,
        email: 'farhan.yaseen.se8@gmail.com'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
