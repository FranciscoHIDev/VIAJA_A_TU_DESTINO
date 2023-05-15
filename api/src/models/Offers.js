const mongoose = require('mongoose')

function currentDate() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const offerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
        maxlength: 45
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 2000
    },
    category: {
        type: {
            name: {
                type: String,
                enum: ["Vuelo", "Paquete", "Hotel", "Tour"],
                default: "Paquete"
            },
            image: {
                type: String,
                default: function () {
                    switch (this.name) {
                        case "Vuelo":
                            return "default_flight_image.jpg";
                        case "Paquete":
                            return "https://res.cloudinary.com/duaysiozi/image/upload/v1683602440/package_tour_sdmqgl.svg";
                        case "Hotel":
                            return "https://res.cloudinary.com/duaysiozi/image/upload/v1683602440/hotel_x7jnwu.svg";
                        case "Tour":
                            return "default_tour_image.jpg";
                        default:
                            return "";
                    }
                }
            }
        }
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destinations",
        require: true
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,

    },
    sampleImages: {
        type: [String],
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
        type: [String]
    },
    author: {
        type: String,
        enum: ["Francisco"],
        default: "Francisco"
    },
    date: {
        type: String,
        default: currentDate
    },
    created: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Offers", offerSchema)