'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {

      Review.belongsTo(models.User,{
        foreignKey:"userId",
        onDelete: "CASCADE"
      })
      Review.belongsTo(models.Spot,{
        foreignKey:"spotId",
        onDelete: "CASCADE"
      })
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete:"CASCADE"
      })
    }
  }


  Review.init({
    spotId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId:{
    type: DataTypes.INTEGER,
    allowNull:false
    },
    review:{
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    } ,
    stars:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: true, 
        min:1,
        max:5 
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};