const express = require("express");
const router = express.Router(); 
const { setTokenCookie, requireAuth } = require("../../utils/auth.js");

const { User, Spot, SpotImage, ReviewImage,
 Review, Booking } = require("../../db/models/index.js");
const { check, query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation.js");
const { Op, Model } = require("sequelize");
const { reviewValidation } = require("../../utils/validation.js");

//DELETE IMAGE FROM REVIEW
router.delete("/:reviewId", requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;
  
    try {
      const review = await Review.findByPk(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }
  
      if (review.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      await review.destroy();
  
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  module.exports = router;