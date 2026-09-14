const express = require("express");

const router = express.Router();

// ======================================================
// ROUTES
// ======================================================

const offerRoutes = require("./Offers");
const userRoutes = require("./Users");
const destinationRoutes = require("./Destinations");
const bannerRoutes = require("./BannerOffer");
const hotelRoutes = require("./Hotels");
const packagesRoutes = require("./Packages");
const authRoutes = require("./Auth");
const blogRoutes = require("./Blog");
const pageSeoRoutes = require("./PageSeo");

// ======================================================
// API ROUTES
// ======================================================

router.use("/offers", offerRoutes);
router.use("/users", userRoutes);
router.use("/destinations", destinationRoutes);
router.use("/banners", bannerRoutes);
router.use("/hotels", hotelRoutes);
router.use("/packages", packagesRoutes);
router.use("/auth", authRoutes);

// BLOG
router.use("/blog", blogRoutes);

// VTD SEO
router.use("/page-seo", pageSeoRoutes);

// ======================================================
// EXPORT
// ======================================================

module.exports = router;