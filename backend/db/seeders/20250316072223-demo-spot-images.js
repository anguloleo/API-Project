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
        {
      spotId: 4,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/beverly.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 5,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/pam+springs.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 6,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/big+bear.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 7,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/zion.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 8,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/redwood.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 9,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/monterey.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 10,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/san+diego.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 11,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/la+jolla.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 12,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/anaheim.jpg",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 13,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/hollywood.jpg",
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
