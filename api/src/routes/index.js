const express = require("express");

const router = express.Router();

// ======================================================
// ROUTES
// ======================================================

const offerRoutes = require("./Offers");
const userRoutes = require("./Users");
const destinationRoutes = require("./Destinations");


const authRoutes = require("./Auth");
const blogRoutes = require("./Blog");
const pageSeoRoutes = require("./PageSeo");

// ======================================================
// API ROUTES
// ======================================================

router.use("/offers", offerRoutes);
router.use("/users", userRoutes);
router.use("/destinations", destinationRoutes);


router.use("/auth", authRoutes);

// BLOG
router.use("/blog", blogRoutes);

// VTD SEO
router.use("/page-seo", pageSeoRoutes);

// ======================================================
// EXPORT
// ======================================================

module.exports = router;