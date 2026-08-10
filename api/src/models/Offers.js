const mongoose = require("mongoose");

function currentDate() {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function createSlug(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const offerSchema = mongoose.Schema({
  title: {
  type: String,
  required: true,
  trim: true,
},

slug: {
  type: String,
  unique: true,
  sparse: true,
  index: true,
  lowercase: true,
  trim: true,
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

offerSchema.pre("validate", async function () {
  // Si ya tiene slug y el título no cambió, no hacemos nada
  if (this.slug && !this.isModified("title")) {
    return;
  }

  const baseSlug = createSlug(this.title);

  if (!baseSlug) {
    return;
  }

  let slug = baseSlug;
  let counter = 2;

  // Comprobar que no exista otra oferta con el mismo slug
  while (
    await this.constructor.exists({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  this.slug = slug;
});
module.exports = mongoose.model("Offers", offerSchema);
