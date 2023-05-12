const hotelSchema = require('../models/Hotels')

/* Routes to create a new hotel */
const routerPostHotel = async (req, res) => {
    try {
        const hotel = hotelSchema(req.body)
        await hotel.save()
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get all the hotels */
const routerGetHotel = async (req, res) => {
    try {
        const allHotels = await hotelSchema.find()
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
        const hotel = await hotelSchema.updateOne({ _id: id }, { $set: { name, image, persons, discount, price, previousPrice, destination, from, to, link } })
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