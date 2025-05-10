'use strict';
const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

options.tableName = 'Spots';

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Cozy Apartment',
        description: 'A beautiful place to stay with an amazing view.',
        price: 150.00
      },
      {
        ownerId: 2,
        address: '456 Ocean Ave',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Condo',
        description: 'Wake up to the sound of waves crashing on the shore.',
        price: 200.00
      },
      {
        ownerId: 3,
        address: '789 Mountain Rd',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain Cabin',
        description: 'A cozy cabin in the mountains for a perfect getaway.',
        price: 175.00
      }
    ], { ...options, validate: true} );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  }
};
