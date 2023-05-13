const mongoose = require('mongoose')
const bannerOfferSchema = mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destinations"
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("BannersOffers", bannerOfferSchema)