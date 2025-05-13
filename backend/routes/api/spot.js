const express = require("express");
const router = express.Router(); 
const { requireAuth } = require("../../utils/auth.js");
const { User, Spot, SpotImage, ReviewImage, Review, Booking } = require("../../db/models");
const { check, query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op, Model } = require("sequelize");
const { reviewValidation } = require("../../utils/validation.js");

//Using a validation middleware to catch any errors before they reach the database
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("An address is required."),

  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Valid city required."),

  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Valid state required."),

  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Valid country required."),

  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be an number between -90 and 90."),

  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be an number between -180 and 180."),

  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "Name is required and must not exceed 50 characters and must have a minimum characters of 1."
    ),

  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required."),

  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 0.1 })
    .withMessage("Price must be a positive number."),

  handleValidationErrors,
];

//Validate Spot inputs FIX
const validateBooking = [
  check('spotId')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a valid spot ID.'),
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid start date.'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid end date.'),

  handleValidationErrors
];

//Pagination and filtering
const ValidateQueryFilters = [
  query("page")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Page should be a number and must be greater than 0."),

  query("size")
    .optional()
    .isFloat({ min: 1, max: 100 })
    .withMessage("Size should be between 1 and 100."),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a positive number."),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a positive number."),

  query("state")
    .optional()
    .isString()
    .withMessage("State must be a valid string."),

  query("city")
    .optional()
    .isString()
    .withMessage("City must be a valid string."),

  handleValidationErrors,
];


//GET ALL SPOTS
router.get("/", ValidateQueryFilters, async (req, res) => {
  
  try {
    const { page = 1, size = 20, minPrice, maxPrice, state, city } = req.query;
    let limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
    let where = {};

    if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    if (city) where.city = city;
    if (state) where.state = state;
    
    const spots = await Spot.findAll({
      where,
      limit,
      offset,
      include: [
        {
          model: SpotImage,
          attributes: ["url"],
          where: { preview: true },
          limit: 1,
        },
        {
          model: Review,
          attributes: ["stars"], 
        },
      ],
    });


    const formattedSpots = spots.map((spot) => {
      
      //avg star rating
      const totalStars = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
      const numReviews = spot.Reviews.length;
      const avgStarRating = numReviews > 0 ? totalStars / numReviews : 0;
      //Preview Image
      const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgStarRating,
        previewImage,
      };
    });


    return res.status(200).json({ Spots: formattedSpots });
  } catch (error) {
    console.error("Error... could not fetch spots");
    return res.status(500).json({ message: "Error retrieving spots" });
  }
});



//GET SPOTS FROM CURRENT USER
router.get("/current", requireAuth, async (req, res) => {
  
  try {
    const userId = req.user.id;
    const spots = await Spot.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: SpotImage,
          attributes: ["url"],
          limit: 1,
        },
        {
          model: Review,
          attributes: ["stars"], 
        },
      ],
    });

    const formattedSpots = spots.map((spot) => {
      const totalStars = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
      const numReviews = spot.Reviews.length;
      const avgStarRating = numReviews > 0 ? parseFloat((totalStars / numReviews).toFixed(1)) : 0;

      const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null;

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgStarRating,
        previewImage
      };
    });

    return res.status(200).json({ Spots: formattedSpots});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error retrieving spots" });
  }
});


//GET SPOT FROM SPOT-ID
router.get("/:id", async (req, res) => {
 
  try {
    const { id } = req.params;
    //Calc avg star rating
    const numReviews = await Review.count({ where: { spotId: id } });
    const totalStars = await Review.sum("stars", { where: { spotId: id } });
    const avgStarRating = numReviews > 0 ? parseFloat((totalStars / numReviews).toFixed(1)) : 0;
    
    //Create spot object
    const spot = await Spot.findByPk(id, {
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview",],
        },
        {
          model: User, 
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    return res.status(200).json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews,
      avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving spot from id" });
  }
});

//POST NEW SPOT
router.post("/", requireAuth, validateSpot, async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const ownerId = req.user.id;

    const newSpot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    return res.status(201).json( newSpot );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not create a new Spot" });
  }
});

//POST IMAGE TO SPOT, BY SPOT-ID FROM PARAMS
router.post("/:id/images", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(id);

    if (!spot) return res.status(404).json({ message: "Spot could't be found" });

    if (spot.ownerId !== userId)
      return res.status(403).json({ message: "Forbidden access!" });

    const image = await SpotImage.create({
      spotId: id,
      url,
      preview,
    });

    return res.status(201).json({
      id: image.id,
      url: image.url,
      preview: image.preview,
    });
  } catch (error) {
    console.error("Could not add Image.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//EDIT A SPOT
router.put("/:id", requireAuth, validateSpot, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spot = await Spot.findByPk(id);

    if (!spot) return res.status(404).json({ message: "Spot not found" });
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: "Forbidden access!" });
    }
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    //going with the .save instead of .update
    await spot.save();

    return res.status(200).json(spot);
  } catch (error) {
    console.error("Error updating spot: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

//DELETE SPOT
router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const spot = await Spot.findByPk(id);
    
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: "Forbidden access!" });
    }
    if (!spot) return res.status(404).json({ message: "Spot not found" });
    await spot.destroy();

    return res.status(200).json({ message: "Spot successfully deleted" });
  } catch (error) {
    console.error("Could not delete spot, Error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//GET REVIEWS FOR SPOT
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) return res.status(404).json({ message: "Spot could not be found" });

    const spotReviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"], // Fixed attribute names
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
  });
    return res.status(200).json({Reviews: spotReviews})
  } catch (error) {
    console.error("Could not find spot reviews:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//ADD REVIEW
router.post("/:spotId/reviews", requireAuth, reviewValidation, async (req, res) => { 
  const { spotId } = req.params
  const userId = req.user.id;
  const { review, stars } = req.body
  try{ 
    const spot = await Spot.findByPk(spotId); 
    if(!spot) return res.status(404).json({ message: "Spot not found" });
    if (spot.ownerId=== userId) {
      return res.status(403).json({ message: "You cannot review your own spot." });
    }
    const existingReview = await Review.findOne({where: { spotId, userId}});
    if(existingReview)return res.status(500).json({message:"User already has a review on this spot."})
    
      const newReview = await Review.create({
    spotId,
    userId,
    review,
    stars
  });

  return res.status(201).json(newReview)
  }catch(error){
    console.error("Error creating a review:", error);
    return res.status(500).json({ message: "Server error" });
  }
})



// GIT ALL BOOKINGS FOR SPOT
router.get('/:spotId/bookings', requireAuth, async (req, res) =>{
  const { user } = req;

  //Find Spot's owner
  const spot = await Spot.findByPk(req.params.spotId);

    // If the spot does not exist, return a 404 error
    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

  //If logged in user is the spot owner
    const ownerBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,
        attributes: [
            'id',
            'firstName',
            'lastName'
        ]
    }
    });
  
    //if logged in user is NOT owner of spot
      const bookings = await Booking.findAll({
        attributes: ['spotId', 'userId', 'startDate', 'endDate'],
        where: {
          spotId: req.params.spotId
        }
      });

if(spot.ownerId === user.id){
  return res.json({
    ownerBookings
  });
};
if(spot.ownerId !== user.id){
  return res.json({
    bookings
  });
};

}
);



// CREATE BOOKING FROM SPOT
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
  const { spotId, startDate, endDate } = req.body;
  const { user } = req;
  const userId = user.id;

  //Get spot
  const spot = await Spot.findByPk(spotId);

  // If the spot does not exist, return a 404 error
  if (!spot) {
    return res.status(404).json({ message: "Spot not found" });
  }

  //A user is only authorized to create a booking if they do NOT own the spot
  if (user.id === spot.ownerId) {
    return res.status(403).json({ message: "Owner cannot book own spot" });
  }

  // Check if booking is available for chosen dates
  const existingBooking = await Booking.findOne({
    where: {
      spotId,
      [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
        {
          [Op.and]: [
            { startDate: { [Op.lte]: startDate } },
            { endDate: { [Op.gte]: endDate } }
          ]
        }
      ]
    }
  });

  if (existingBooking) {
    return res.status(403).json({ message: "Spot is already booked for the selected dates" });
  }

  //CREATE BOOKING
  const newBooking = await Booking.create({ userId, spotId, startDate, endDate });
  
    return res.status(201).json({
      newBooking
    });
  }
);

module.exports = router;
