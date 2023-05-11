const mongoose = require('mongoose')
const bannerDestinationSchema = mongoose.Schema({
    destination: {
        type: mongoose.Types.ObjectId,
        ref: "Destinations"
    },
    image: {
        type: String,
        required: true
    },
    promotionText: {
        type: String,
        required: true

    },
    linkHotel: {
        type: String,
        required: true
    },
    linkPackage: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("BannersDestinations", bannerDestinationSchema)


