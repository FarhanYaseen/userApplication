'use strict';
const sha1 = require('sha1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = sha1("somePassword");

    return queryInterface.bulkInsert('Users', [{
      firstName: 'Brijal',
      lastName: 'Savaliya',
      email: '',
      password: hash,
      hash,
      email: 'farhan.yaseen.se@gmail.com'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
