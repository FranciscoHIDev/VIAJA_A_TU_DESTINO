const Offers = require("../models/Offers")
const offerSchema = require("../models/Offers")
const destinationSchema = require("../models/Destinations")

/* Routes to create a new offer */
const routerPostOffer = async (req, res) => {
    try {
        const { title, summary, description, category, destination, price, image, sampleImages, promotion, departure, arrival, availability, daysOfStay, hotel, buyLinks, author } = req.body
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const newOffer = await new offerSchema({
            title: title,
            summary: summary,
            description: description,
            category: category,
            destination: dest._id,
            price: price,
            image: image,
            sampleImages: sampleImages,
            promotion: promotion,
            departure: departure,
            arrival: arrival,
            availability: availability,
            daysOfStay: daysOfStay,
            hotel: hotel,
            buyLinks: buyLinks,
            author: author
        })
        await newOffer.save()
        await newOffer.populate("destination")
        res.status(201).json(newOffer)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get all the offers */
const routerGetOffer = async (req, res) => {
    try {
        const allOffers = await offerSchema.find()
            .populate("destination", { name: 1 })
        res.status(200).json(allOffers)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get a offer */
const routerGetByIdOffer = async (req, res) => {
    try {
        const { id } = req.params
        const offer = await offerSchema.findById(id)
            .populate("destination", { name: 1 })
        res.status(200).json(offer)
       
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to modify a offer */
const routerPutOffer = async (req, res) => {
    try {
        const { id } = req.params
        const { title, summary, description, category, destination, price, image, sampleImages, promotion, departure, arrival, availability, daysOfStay, hotel, buyLinks, author, active } = req.body
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const offer = await offerSchema.updateOne({ _id: id }, { $set: { title, summary, description, category, destination: dest._id, price, image, sampleImages, promotion, departure, arrival, availability, daysOfStay, hotel, buyLinks, author, active } })
        res.status(200).json(offer)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to delete a offer */
const routerDeleteOffer = async (req, res) => {
    try {
        const { id } = req.params
        const offer = await offerSchema.findByIdAndRemove(id)
        res.status(200).send("Offer successfully removed")
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }

}
module.exports = { routerPostOffer, routerGetOffer, routerGetByIdOffer, routerPutOffer, routerDeleteOffer }