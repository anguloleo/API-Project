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
      },
            {
        ownerId: 1,
        address: '4560 W Beverly Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.06265589104205,
        lng: -118.42484479232674,
        name: 'Glamorous Lifestyle',
        description: 'A luxurious place.',
        price: 650.00
      },
            {
        ownerId: 1,
        address: '2866 E Livmore Ave',
        city: 'Palm Springs',
        state: 'CA',
        country: 'USA',
        lat: 33.825536539007025, 
        lng: -116.51463544453942,
        name: 'Desrt Oasis',
        description: 'Enjoy the California sun and relaxation.',
        price: 123.00
      },
            {
        ownerId: 2,
        address: '42452 Holiday Ln',
        city: 'Big Bear Lake',
        state: 'CA',
        country: 'USA',
        lat: 34.24706969823595, 
        lng: -116.87630761815157,
        name: 'Big Bear Cabin',
        description: 'Enjoy the ski slopes and have some hot coco with the family.',
        price: 358.00
      },
            {
        ownerId: 2,
        address: '1 Zion Canyon Scenic Dr',
        city: 'Springdale',
        state: 'UT',
        country: 'USA',
        lat: 37.25020973299965, 
        lng: -112.95649471489565,
        name: 'Zion Lodge',
        description: 'Enjoy Zion national park.',
        price: 170.00
      },
            {
        ownerId: 3,
        address: '38 Hansen St',
        city: 'Orick',
        state: 'CA',
        country: 'USA',
        lat: 41.28655229588372, 
        lng: -124.06195312876152,
        name: 'Redwoods Galore',
        description: 'Checkout the redwood in northern California.',
        price: 166.00
      },
            {
        ownerId: 1,
        address: '638 Laine St',
        city: 'Monterey',
        state: 'CA',
        country: 'USA',
        lat: 36.61324303000357, 
        lng: -121.90364217605709,
        name: 'Monterey Aquarium Home',
        description: 'Stay close to the Monterey Aquarium.',
        price: 189.00
      },
            {
        ownerId: 1,
        address: '2461 Island Ave',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.71034736224532, 
        lng: -117.14113330057032,
        name: 'San Diego Bungalo',
        description: 'Enjoy San Diego in this cute home.',
        price: 96.00
      },
            {
        ownerId: 3,
        address: '2521 Calle Del Oro',
        city: 'La Jolla',
        state: 'CA',
        country: 'USA',
        lat: 32.85683772744598, 
        lng: -117.24931317684481,
        name: 'La Jolla of the Sea',
        description: 'Beautiful home by La Jolla.',
        price: 150.00
      },
            {
        ownerId: 2,
        address: '1195 W Vermont Ave',
        city: 'Anaheim',
        state: 'CA',
        country: 'USA',
        lat: 33.81921266552878, 
        lng: -117.92748962221229,
        name: 'Disney Home',
        description: 'Enjoy this beautiful home by the Disney park.',
        price: 328.00
      },
            {
        ownerId: 2,
        address: '6248 De Longpre Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.09604200599213, 
        lng: -118.3254432664513,
        name: 'Hollywood Home',
        description: 'Enjoy the hollywood walk of fame.',
        price: 359.00
      },
    ], { ...options, validate: true} );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  }
};
