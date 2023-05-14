const hotelSchema = require('../models/Hotels')
const destinationSchema = require("../models/Destinations")

/* Routes to create a new hotel */
const routerPostHotel = async (req, res) => {
    const { name, image, persons, discount, price, previousPrice, destination, from, to, link } = req.body;
    try {
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const newHotel = await new hotelSchema({
            name: name,
            image: image,
            persons: persons,
            discount: discount,
            price: price,
            previousPrice: previousPrice,
            destination: dest._id,
            from: from,
            to: to,
            link: link
        })
        await newHotel.save()
        await newHotel.populate("destination")
        res.status(201).json(newHotel)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get all the hotels */
const routerGetHotel = async (req, res) => {
    try {
        const allHotels = await hotelSchema.find()
            .populate("destination", { name: 1 })
        res.status(200).json(allHotels)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get a hotel */
const routerGetByIdHotel = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await hotelSchema.findById(id)
            .populate("destination", { name: 1 })
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to modify a hotel */
const routerPutHotel = async (req, res) => {
    try {
        const { id } = req.params
        const { name, image, persons, discount, price, previousPrice, destination, from, to, link } = req.body
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const hotel = await hotelSchema.updateOne({ _id: id }, { $set: { name, image, persons, discount, price, previousPrice, destination: dest._id, from, to, link } })
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to delete a hotel */
const routerDeleteHotel = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await hotelSchema.findByIdAndRemove(id)
        res.status(200).send("Hotel successfully removed")
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

module.exports = { routerPostHotel, routerGetHotel, routerGetByIdHotel, routerPutHotel, routerDeleteHotel }