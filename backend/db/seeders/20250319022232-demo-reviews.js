'use strict';

const { Review } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; 
}

options.tableName = 'Reviews';

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate( [
      {
        spotId: 2,
        userId: 1,
        review: "The beachfront view was absolutely stunning! I didn't want to leave.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        userId: 2,
        review: "Great location, but the waves were a bit too loud at night.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        userId: 3,
        review: "This cabin was the perfect mountain getaway! Super cozy and peaceful.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        userId: 1,
        review: "Nice place, but the road to get there was a bit rough. Still, a great stay!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { ...options });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  },
};