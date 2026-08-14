const mongoose = require("mongoose");

// ======================================================
// FECHA
// ======================================================

function currentDate() {
  const date = new Date();

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

// ======================================================
// GENERAR SLUG
// ======================================================

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

// ======================================================
// BUY LINKS
// ======================================================

const buyLinkSchema = new mongoose.Schema(
  {
    departureDate: {
      type: String,
      required: true,
      trim: true,
    },

    returnDate: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      required: true,
      trim: true,
    },

    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

// ======================================================
// CATEGORÍA
// ======================================================

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,

      enum: [
        "Vuelo",
        "Paquete",
        "Hotel",
        "Tour",
      ],

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
  {
    _id: false,
  },
);

// ======================================================
// ESQUEMA PRINCIPAL
// ======================================================

const offerSchema = new mongoose.Schema({
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
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: categorySchema,

    default: () => ({
      name: "Paquete",
    }),
  },

  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destinations",
    required: true,
  },

  price: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: [String],
    required: true,

    validate: {
      validator(value) {
        return Array.isArray(value) && value.length > 0;
      },

      message:
        "La oferta debe tener al menos una imagen principal.",
    },
  },

  sampleImages: {
    type: [String],
    required: true,

    validate: {
      validator(value) {
        return Array.isArray(value) && value.length > 0;
      },

      message:
        "La oferta debe tener al menos una imagen de referencia.",
    },
  },

  promotion: {
    type: String,
    trim: true,
    default: "",
  },

  departure: {
    type: String,
    trim: true,
    default: "",
  },

  arrival: {
    type: String,
    trim: true,
    default: "",
  },

  availability: {
    type: String,
    trim: true,
    default: "",
  },

  daysOfStay: {
    type: String,
    trim: true,
    default: "",
  },

  hotel: {
    type: String,
    trim: true,
    default: "",
  },

  buyLinks: {
    type: [buyLinkSchema],

    validate: {
      validator(value) {
        return Array.isArray(value) && value.length > 0;
      },

      message:
        "La oferta debe tener al menos una fecha y enlace de compra.",
    },

    required: true,
  },

  author: {
    type: String,

    enum: [
      "Francisco",
      "Susana",
    ],

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

// ======================================================
// GENERAR SLUG ÚNICO
// ======================================================

offerSchema.pre("validate", async function () {
  /*
   * Si ya existe un slug y el título no cambió,
   * conservamos el slug actual.
   */

  if (this.slug && !this.isModified("title")) {
    return;
  }

  const baseSlug = createSlug(this.title);

  if (!baseSlug) {
    return;
  }

  let candidateSlug = baseSlug;
  let counter = 2;

  /*
   * IMPORTANTE:
   *
   * No usamos:
   *
   * _id: { $ne: this._id }
   *
   * Esto evita problemas cuando Mongoose tiene
   * sanitizeFilter habilitado.
   */

  while (true) {
    const existingOffer = await this.constructor
      .findOne({
        slug: candidateSlug,
      })
      .select("_id")
      .lean();

    // No existe ninguna oferta con ese slug
    if (!existingOffer) {
      break;
    }

    /*
     * Si estamos editando y el slug encontrado
     * pertenece a esta misma oferta, podemos usarlo.
     */

    if (
      this._id &&
      String(existingOffer._id) === String(this._id)
    ) {
      break;
    }

    /*
     * Existe otra oferta con el mismo slug.
     *
     * Ejemplo:
     *
     * hotel-castillo-huatulco
     * hotel-castillo-huatulco-2
     * hotel-castillo-huatulco-3
     */

    candidateSlug = `${baseSlug}-${counter}`;

    counter += 1;
  }

  this.slug = candidateSlug;
});

// ======================================================
// MODELO
// ======================================================

module.exports = mongoose.model(
  "Offers",
  offerSchema,
);