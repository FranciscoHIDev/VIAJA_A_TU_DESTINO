const express = require('express')
const router = express.Router()
const { routerPostBanner, routerGetBanner, routerGetByIdBanner, routerPutBanner, routerDeleteBanner } = require("../controllers/BannerController")

router.post("/", (req, res) => {
    routerPostBanner(req, res)
})

router.get("/", (req, res) => {
    routerGetBanner(req, res)
})

router.get("/:id", (req, res) => {
    routerGetByIdBanner(req, res)
})

router.put("/:id", (req, res) => {
    routerPutBanner(req, res)
})

router.delete("/:id", (req, res) => {
    routerDeleteBanner(req, res)
})

module.exports = router