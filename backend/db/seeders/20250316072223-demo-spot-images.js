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
      spotId: 1,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/Spot1/pexels-jvdm-1457842.jpg",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 1,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/Spot1/pexels-heyho-7546314.jpg",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 1,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/Spot1/pexels-curtis-adams-1694007-3288104.jpg",
      preview:false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      spotId: 1,
      url: "https://lodgr.s3.us-east-2.amazonaws.com/Spot1/pexels-castorlystock-3610006.jpg",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      spotId: 2,
      url: "https://images.pexels.com/photos/6010421/pexels-photo-6010421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      spotId: 2,
      url: "https://images.pexels.com/photos/5570224/pexels-photo-5570224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      spotId: 2,
      url: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      spotId: 2,
      url: "https://images.pexels.com/photos/3315286/pexels-photo-3315286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      preview: false,
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
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51387814/original/4032ace7-8a35-415b-9394-41d699ec28b9.jpeg?im_w=1200",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
            {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51387814/original/499b67f5-bb50-4d47-8e8e-d1f510c924fe.jpeg?im_w=1200",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
            {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51387814/original/0df1cf84-337f-4e10-b026-0697544ff68b.jpeg?im_w=1200",
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
            {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51387814/original/40203471-75d4-4398-a7c0-17b7ec5a1754.jpeg?im_w=1200",
      preview: false,
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
