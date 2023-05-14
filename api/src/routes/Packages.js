const express = require('express')
const router = express.Router()

const { routerPostPackage, routerGetPackages, routerGetByIdPackage, routerDeletePackage, routerPutPackage } = require('../controllers/PackagesController')

/* This route is to create a package*/
router.post("/", (req, res) => {
    routerPostPackage(req, res)
})

/* This is a route that allows you to get all the packages*/
router.get("/", (req, res) => {
    routerGetPackages(req, res)
})

/* This is a route that allows you to get a package*/
router.get("/:id", (req, res) => {
    routerGetByIdPackage(req, res)
})

/* This is a route that allows you to modify a package */
router.put("/:id", (req, res) => {
    routerPutPackage(req, res)
})

/* This is a route that allows you to delete a package */
router.delete("/:id", (req, res) => {
    routerDeletePackage(req, res)
})

module.exports = router