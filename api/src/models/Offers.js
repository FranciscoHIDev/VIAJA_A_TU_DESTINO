const mongoose = require("mongoose");

function currentDate() {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const offerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: {
      name: {
        type: String,
        enum: ["Vuelo", "Paquete", "Hotel", "Tour"],
        default: "Paquete",
      },
      image: {
        type: String,
        default: function () {
          switch (this.name) {
            case "Vuelo":
              return "https://res.cloudinary.com/duaysiozi/image/upload/v1690434712/flight-plane-svgrepo-com_1_vbk423.svg";
            case "Paquete":
              return "https://res.cloudinary.com/duaysiozi/image/upload/v1683602440/package_tour_sdmqgl.svg";
            case "Hotel":
              return "https://res.cloudinary.com/duaysiozi/image/upload/v1683602440/hotel_x7jnwu.svg";
            case "Tour":
              return "https://res.cloudinary.com/duaysiozi/image/upload/v1690434233/trip_kwitxb.svg";
            default:
              return "";
          }
        },
      },
    },
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destinations",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  sampleImages: {
    type: Array,
    required: true,
  },
  promotion: {
    type: String,
  },

  departure: {
    type: String,
  },
  arrival: {
    type: String,
  },
  availability: {
    type: String,
  },
  daysOfStay: {
    type: String,
  },
  hotel: {
    type: String,
  },
  buyLinks: {
    type: Array,
    link: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
    },
    returnDate: {
      type: String,
    },
    price: {
      type: String,
    },

    required: true,
  },
  author: {
    type: String,
    enum: ["Francisco"],
    default: "Francisco",
  },
  date: {
    type: String,
    default: currentDate,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Offers", offerSchema);
