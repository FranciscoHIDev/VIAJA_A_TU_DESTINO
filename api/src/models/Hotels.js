const mongoose = require('mongoose')
const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    persons: {
        type: String,
        required: true
    },
    discount: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    previousPrice: {
        type: String
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destinations"
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Hotels", hotelSchema)