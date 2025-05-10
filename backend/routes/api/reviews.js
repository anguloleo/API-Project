const express = require("express");
const router = express.Router(); 
const { setTokenCookie, requireAuth } = require("../../utils/auth.js");
const {User, Spot, SpotImage, Review, Booking, ReviewImage } = require("../../db/models");
const { reviewValidation } = require("../../utils/validation");
const { Op, Model, where } = require("sequelize");


//GET ALL REVIEWS FROM USER
router.get("/current", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: Spot,
          include: [
            {
              model: SpotImage,
              attributes: ["url"],
              where: { preview: true },
              required: false,
            },
          ],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    const formattedReviews = [];

    for (let i = 0; i < reviews.length; i++) {
      const reviewData = reviews[i].toJSON();
      const images = reviewData.Spot.SpotImages;
      reviewData.Spot.previewImage = images?.length ? images[0].url : null;
      delete reviewData.Spot.SpotImages;
      formattedReviews.push(reviewData);
    }

    return res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
});

//ADD IMAGE TO REVIEW
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { url } = req.body;
    const userId = req.user.id;

    if (!url) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const review = await Review.findOne({ where: { id: reviewId, userId } });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const reviewImages = await ReviewImage.count({ where: { reviewId } });

    if (reviewImages >= 10)
      return res
        .status(403)
        .json({
          message: "Maximum number of images for this resource was reached",
        });

    const newImage = await ReviewImage.create({ reviewId, url });

    return res.status(201).json({ id: newImage.id, url: newImage.url });
  } catch (error) {
    console.error("Error adding review image:", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

//EDIT REVIEW
router.put("/:reviewId", requireAuth, reviewValidation, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  try {
    const updatedReview = await Review.findByPk(reviewId);

    if (!updatedReview)
      return res.status(404).json({ error: "Review not found" });
    if (updatedReview.userId !== userId)
      return res
        .status(403)
        .json({ error: "Forbidden: User does not belong to you" });

    await updatedReview.update({ review, stars });
    return res
      .status(200)
      .json({ message: "Updated review successfully", updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

//DELETE REVIEW
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.userId !== userId)
      return res
        .status(403)
        .json({ error: "Forbidden: User does not belong to you" });

    await review.destroy();
    return res.status(200).json({ message: "Deleted review successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = router;
