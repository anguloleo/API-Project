// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotRouter = require("./spot.js");
const bookingsRouter = require("./bookings.js");
const reviewRouter = require("./reviews.js");
const spotImagesRouter = require("./spot-images.js");
const reviewImagesRouter = require("./review-images.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/bookings", bookingsRouter);
router.use("/reviews", reviewRouter);
router.use("/spot-images", spotImagesRouter);
router.use("/review-images", reviewImagesRouter);


module.exports = router;
