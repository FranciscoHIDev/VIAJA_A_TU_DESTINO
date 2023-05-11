const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({
    destination: {
        type: mongoose.Types.ObjectId,
        ref: "Destinations"
    },
    discount: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Banners", bannerSchema)