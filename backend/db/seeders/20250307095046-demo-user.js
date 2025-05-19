'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

options.tableName = 'Users';

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'John',
        lastName: "Doe",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Deb',
        lastName: "Ross",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Ben',
        lastName: "Ten",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
            {
        firstName: 'Lucy',
        lastName: "Loo",
        email: 'lucywho@yahoo.com',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
      },
        {
        firstName: 'Cameron',
        lastName: "Diaz",
        email: 'msdiaz34@gmail.com',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
      },
        {
        firstName: 'Drew  ',
        lastName: "Barrymore",
        email: 'imanacress58@yahoo.com',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6')
      },
        {
        firstName: 'John',
        lastName: "Bosley",
        email: 'charliesdevils@gmail.com',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7')
      }
    ], { ...options, validate: true });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  }
};
