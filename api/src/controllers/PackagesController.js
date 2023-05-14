const packageSchema = require("../models/Packages")
const destinationSchema = require("../models/Destinations")

/* Routes to create a new package */
const routerPostPackage = async (req, res) => {
    try {
        const { hotel, image, destination, promotion, price, previousPrice, persons, from, to, link } = req.body;
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const newPackage = await new packageSchema({
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
/* This is a route that allows you to get all the packages */
const routerGetPackages = async (req, res) => {
    try {
        const allPackages = await packageSchema.find()
            .populate("destination", { name: 1 })
        res.status(200).json(allPackages)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }

}
/* This is a route that allows you to get a package */
const routerGetByIdPackage = async (req, res) => {
    try {
        const { id } = req.params
        const package = await packageSchema.findById(id)
            .populate("destination", { name: 1 })
        res.status(200).json(package)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
/* This is a route that allows you to modify a package */
const routerPutPackage = async (req, res) => {
    try {
        const { id } = req.params
        const { hotel, image, destination, promotion, price, previousPrice, persons, from, to, link } = req.body;
        let dest = await destinationSchema.findOne({ name: { $regex: new RegExp(destination, "i") } })
        if (!dest) {
            dest = await destinationSchema.create({ name: destination.toUpperCase() })
        }
        const package = await packageSchema.updateOne({ _id: id }, { $set: { hotel, image, destination: dest._id, promotion, price, previousPrice, persons, from, to, link } })
        res.status(200).json(package)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
/* This is a route that allows you to delete a package */
const routerDeletePackage = async (req, res) => {
    try {
        const { id } = req.params
        const package = await packageSchema.findByIdAndDelete(id)
        res.status(200).send("Package removing successfully")
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
module.exports = { routerPostPackage, routerGetPackages, routerGetByIdPackage, routerPutPackage, routerDeletePackage }