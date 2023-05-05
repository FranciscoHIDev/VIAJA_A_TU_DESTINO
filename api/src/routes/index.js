const express = require('express')
const router = express.Router()


/* This is importing the routes from the files that are in the same directory as this file. */
const offerRoutes = require("./Offers")
const userRoutes = require("./Users")


/* Telling the server to use the routes in the files that are imported. */
router.use("/offers", offerRoutes)
router.use("/users", userRoutes)

module.exports = router