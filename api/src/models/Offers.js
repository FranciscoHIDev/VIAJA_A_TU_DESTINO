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
        maxLength: 2000
    },
    category: {
        type: String,
        enum: ["Vuelo", "Paquete", "Hotel", "Tour"],
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
        type: Array,
        required: true,

    },
    sampleImage: {
        type: Array,
    }
    ,
    promotion: {
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
    daysOfStay: {
        type: String
    },
    hotel: {
        type: String
    },
    buyLinks: {
        type: Array
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Offers", offerSchema)