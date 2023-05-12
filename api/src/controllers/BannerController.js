const bannerSchema = require('../models/Banners')

const routerPostBanner = async (req, res) => {
    try {
        const banner = bannerSchema(req.body)
        await banner.save()
        res.status(200).json(banner)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerGetBanner = async (req, res) => {
    try {
        const allBanners = await bannerSchema.find()
        res.status(200).json(allBanners)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerGetByIdBanner = async (req, res) => {
    try {
        const { id } = req.params
        const banner = await bannerSchema.findById(id)
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerPutBanner = async (req, res) => {
    try {
        const { id } = req.params
        const { destination, discount, link } = req.body
        const banner = await bannerSchema.updateOne({ _id: id }, { $set: { destination, discount, link } })
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerDeleteBanner = async (req, res) => {
    try {
        const { id } = req.params
        const banner = await bannerSchema.findByIdAndRemove(id)
        res.status(200).send("Banner removed successfully")

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
module.exports = { routerPostBanner, routerGetBanner, routerGetByIdBanner, routerPutBanner, routerDeleteBanner }