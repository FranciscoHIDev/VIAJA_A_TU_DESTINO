const express = require('express')
const router = express.Router()

const { routerPostHotel, routerGetHotel, routerGetByIdHotel, routerPutHotel, routerDeleteHotel } = require("../controllers/HotelController")


router.post("/", (req, res) => {
    routerPostHotel(req, res)
})

router.get("/", (req, res) => {
    routerGetHotel(req, res)
})

router.get("/:id", (req, res) => {
    routerGetByIdHotel(req, res)
})

router.put("/:id", (req, res) => {
    routerPutHotel(req, res)
})

router.delete("/:id", (req, res) => {
    routerDeleteHotel(req, res)
})

module.exports = router