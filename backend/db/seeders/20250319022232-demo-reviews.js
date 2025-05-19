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
      {
        spotId: 1,
        userId: 1,
        review: "I liked it but I like bananas more!",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
            {
        spotId: 5,
        userId: 3,
        review: "Awesome place, well worth the money. Already planning our stay for next year!",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
            {
        spotId: 6,
        userId: 6,
        review: "A panda is both blck and white, ying and yang.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
            {
        spotId: 13,
        userId: 7,
        review: "cuz baby I'm a rockstar, a rockstar!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
            {
        spotId: 12,
        userId: 5,
        review: "Newpapers used to give us the news, how we have Tik Tok.",
        stars: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
            {
        spotId: 11,
        userId: 4,
        review: "Party with Cardi, pArTy WiTh CaRdI, PARTY WITH CARDI.",
        stars: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
            {
        spotId: 8,
        userId: 7,
        review: "Definately recommend you book this spot, its so awesome!",
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