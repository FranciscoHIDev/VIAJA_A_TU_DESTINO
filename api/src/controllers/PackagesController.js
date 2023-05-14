const packageSchema = require("../models/Packages")
const destinationSchema = require("../models/Destinations")

/* Routes to create a new package */
const routerPostPackage = async (req, res) => {

    const { hotel, image, destination, promotion, price, previousPrice, persons, from, to, link } = req.body;
    try {
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const newPackage = new packageSchema({
            hotel: hotel,
            image: image,
            destination: dest._id,
            promotion: promotion,
            price: price,
            previousPrice: previousPrice,
            persons: persons,
            from: from,
            to: to,
            link: link
        })
        await newPackage.save()
        await newPackage.populate("destination")
        res.status(201).json(newPackage)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

module.exports = { routerPostPackage }