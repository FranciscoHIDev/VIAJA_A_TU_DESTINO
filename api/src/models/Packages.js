const mongoose = require('mongoose')
const packageSchema = mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destinations"
    },
    image:{
        type:[String],
        required:true
    },
    hotel: {
        type: String,
        required: true
    },
    promotion: {
        type: String
    },
    price: {
        type: String,
        required: true,

    },
    previousPrice: {
        type: String
    },
    persons: {
        type: String,
        required: true
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

module.exports = mongoose.model("Packages", packageSchema)