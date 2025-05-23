'use strict';

const { ReviewImage } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; 
}

options.tableName = 'ReviewImages';


module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,  
        url: "https://example.com/review-image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 2,  
        url: "https://example.com/review-image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewId: 3,
        url: "https://example.com/review-image3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { ...options });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  },
};