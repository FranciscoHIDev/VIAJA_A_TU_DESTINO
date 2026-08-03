const express = require("express");
const router = express.Router();

const offerRoutes = require("./Offers");
const userRoutes = require("./Users");
const destinationRoutes = require("./Destinations");
const bannerRoutes = require("./BannerOffer");
const hotelRoutes = require("./Hotels");
const packagesRoutes = require("./Packages");
const authRoutes = require("./Auth");

router.use("/offers", offerRoutes);
router.use("/users", userRoutes);
router.use("/destinations", destinationRoutes);
router.use("/banners", bannerRoutes);
router.use("/hotels", hotelRoutes);
router.use("/packages", packagesRoutes);
router.use("/auth", authRoutes);

module.exports = router;