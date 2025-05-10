'use strict';
const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; 
}

options.tableName = 'SpotImages';

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate( [
    {
      spotId: 1,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/pexels-binyaminmellish-106399.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      spotId: 2,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/pexels-pixabay-276724.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      spotId: 3,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/pexels-rickyrecap-1586298.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { ...options });
  },

    async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  }
};
