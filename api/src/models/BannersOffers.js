const mongoose = require('mongoose')
const bannerOfferSchema = mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destinations"
    },
    textPromotion: {
        type: String
    },
    textDiscount: {
        type: String
    },
    discount: {
        type: Number,

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