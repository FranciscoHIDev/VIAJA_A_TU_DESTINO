const express = require('express')
const router = express.Router()
const { routerPostDestination, routerGetDestination, routerGetByIdDestination, routerPutDestination,  routerDeleteDestination } = require("../controllers/DestinationsController")

router.post("/", (req, res) => {
    routerPostDestination(req, res)
})

router.get("/", (req, res) => {
    routerGetDestination(req, res)
})

router.get("/:id", (req, res) => {
    routerGetByIdDestination(req, res)
})

router.put("/:id", (req, res) => {
    routerPutDestination(req, res)
})

router.delete("/:id", (req, res) => {
    routerDeleteDestination(req, res)
})

module.exports = router