const express = require('express')
const router = express.Router()
const { routerPostOffer, routerGetOffer, routerGetByIdOffer, routerPutOffer, routerDeleteOffer } = require("../controllers/OffersController")


router.post("/", (req, res) => {
    routerPostOffer(req, res)
})

router.get("/", (req, res) => {
    routerGetOffer(req, res)
})

router.get("/:id", (req, res) => {
    routerGetByIdOffer(req, res)
})

router.put("/:id", (req, res) => {
    routerPutOffer(req, res)
})

router.delete("/:id", (req, res) => {
    routerDeleteOffer(req, res)
})

module.exports = router