const bannerOfferSchema = require('../models/BannersOffers')
const destinationSchema = require('../models/Destinations')

const routerPostBanner = async (req, res) => {
    const { destination, discount, image, link } = req.body
    try {
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const newBanner = new bannerOfferSchema({
            destination: dest._id,
            discount: discount,
            image: image,
            link: link
        })
        await newBanner.save()
        res.status(201).json(banner)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerGetBanner = async (req, res) => {
    try {
        const allBanners = await bannerOfferSchema.find()
        res.status(200).json(allBanners)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerGetByIdBanner = async (req, res) => {
    try {
        const { id } = req.params
        const banner = await bannerOfferSchema.findById(id)
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerPutBanner = async (req, res) => {
    try {
        const { id } = req.params
        const { destination, discount, link } = req.body
        const banner = await bannerOfferSchema.updateOne({ _id: id }, { $set: { destination, discount, link } })
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerDeleteBanner = async (req, res) => {
    try {
        const { id } = req.params
        const banner = await bannerOfferSchema.findByIdAndRemove(id)
        res.status(200).send("Banner removed successfully")

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
module.exports = { routerPostBanner, routerGetBanner, routerGetByIdBanner, routerPutBanner, routerDeleteBanner }