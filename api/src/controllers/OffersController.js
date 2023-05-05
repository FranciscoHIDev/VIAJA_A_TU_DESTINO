const Offers = require("../models/Offers")
const offerSchema = require("../models/Offers")

/* Routes to create a new offer */
const routerPostOffer = async (req, res) => {
    try {
        const offer = offerSchema(req.body)
        await offer.save()
        res.status(200).json(offer)

    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to get all the offers */
const routerGetOffer = async (req, res) => {
    try {
        const allOffers = await offerSchema.find()
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
        res.status(200).json(offer)
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}

/* This is a route that allows you to modify a offer */
const routerPutOffer = async (req, res) => {
    try {
        const { id } = req.params
        const { title, summary, description, category, destination, price, image, promotion, departure, arrival, availability, hotel, active } = req.body
        const offer = await offerSchema.updateOne({ _id: id }, { $set: { title, summary, description, category, destination, price, image, promotion, departure, arrival, availability, hotel, active } })
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
        res.status(200).send("Oferta eliminada con exito")
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }

}
module.exports = { routerPostOffer, routerGetOffer, routerGetByIdOffer, routerPutOffer, routerDeleteOffer }