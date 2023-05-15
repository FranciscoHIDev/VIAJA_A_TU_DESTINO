const bannerOfferSchema = require('../models/BannersOffers')
const destinationSchema = require('../models/Destinations')

const routerPostBanner = async (req, res) => {
    const { destination, discount, image, textDiscount, textPromotion, link } = req.body
    try {
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const newBanner = await new bannerOfferSchema({
            destination: dest._id,
            discount: discount,
            image: image,
            textDiscount: textDiscount,
            textPromotion: textPromotion,
            link: link
        })
        await newBanner.save()
        await newBanner.populate("destination")
        res.status(201).json(newBanner)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerGetBanner = async (req, res) => {
    try {
        const allBanners = await bannerOfferSchema.find()
            .populate("destination", { name: 1 })
        res.status(200).json(allBanners)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerGetByIdBanner = async (req, res) => {
    try {
        const { id } = req.params
        const banner = await bannerOfferSchema.findById(id)
            .populate("destination", { name: 1 })
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

const routerPutBanner = async (req, res) => {
    try {
        const { id } = req.params
        const { destination, discount, image, textDiscount, textPromotion, link } = req.body
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const banner = await bannerOfferSchema.updateOne({ _id: id }, { $set: { destination: dest._id, discount, image, textDiscount, textPromotion, link } })
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