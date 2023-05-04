const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 600
    },
    category: {
        type: String,
        enum: ["Vuelo, Paquete, Hotel, Tour"],
        default: "Paquete"
    },
    destination: {
        type: String
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,

    },
    promotion: {
        type: String
    },
    location: {
        type: String
    },
    departure: {
        type: String
    },
    arrival: {
        type: String
    },
    availability: {
        type: String
    },
    stay: {
        type: String
    },
    hotel: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Offers", offerSchema)