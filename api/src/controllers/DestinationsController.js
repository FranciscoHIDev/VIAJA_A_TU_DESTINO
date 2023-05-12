const destinationSchema = require("../models/Destinations")

/* Routes to create a new destination */
const routerPostDestination = async (req, res) => {
    try {
        const destination = destinationSchema(req.body)
        await destination.save()
        res.status(201).json(destination)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
/* This is a route that allows you to get all the destinations */
const routerGetDestination = async (req, res) => {
    try {
        const allDestinations = await destinationSchema.find()
        res.status(200).json(allDestinations)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get a destination */
const routerGetByIdDestination = async (req, res) => {
    try {
        const { id } = req.params
        const destination = await destinationSchema.findById(id)
        res.status(200).json(destination)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to modify a destination */
const routerPutDestination = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const destination = await destinationSchema.updateOne({ _id: id }, { $set: { name } })
        res.status(200).json(destination)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to delete a destinaton */
const routerDeleteDestination = async (req, res) => {
    try {
        const { id } = req.params
        const destination = await destinationSchema.findByIdAndRemove(id)
        res.status(200).send("Destin successfully removed ")

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
module.exports = { routerPostDestination, routerGetDestination, routerGetByIdDestination, routerPutDestination, routerDeleteDestination }