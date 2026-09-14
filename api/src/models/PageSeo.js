const mongoose = require("mongoose");

// ======================================================
// PAGE SEO
// Configuración SEO de páginas públicas
// Viaja a tu Destino
// ======================================================

const pageSeoSchema = new mongoose.Schema(
  {
    // ======================================================
    // IDENTIFICACIÓN DE LA PÁGINA
    // ======================================================

    pageKey: {
      type: String,
      required: [true, "La clave de la página es obligatoria"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    label: {
      type: String,
      required: [true, "El nombre de la página es obligatorio"],
      trim: true,
      maxlength: 120,
    },

    path: {
      type: String,
      required: [true, "La ruta de la página es obligatoria"],
      unique: true,
      trim: true,
      index: true,
    },

    // ======================================================
    // TIPO DE PÁGINA / SCHEMA
    // ======================================================

    schemaType: {
      type: String,

      enum: [
        "WebPage",
        "CollectionPage",
        "AboutPage",
        "ContactPage",
      ],

      default: "WebPage",
    },

    // ======================================================
    // SEO
    // ======================================================

    seo: {
      // ------------------------------------------------------
      // FRASE CLAVE PRINCIPAL
      // ------------------------------------------------------

      focusKeyword: {
        type: String,
        trim: true,
        default: "",
        maxlength: 150,
      },

      // ------------------------------------------------------
      // GOOGLE / BUSCADORES
      // ------------------------------------------------------

      title: {
        type: String,
        trim: true,
        default: "",
        maxlength: 220,
      },

      description: {
        type: String,
        trim: true,
        default: "",
        maxlength: 320,
      },

      // ------------------------------------------------------
      // CANONICAL
      // ------------------------------------------------------

      canonicalUrl: {
        type: String,
        trim: true,
        default: "",
      },

      // ------------------------------------------------------
      // OPEN GRAPH / REDES SOCIALES
      // ------------------------------------------------------

      image: {
        type: String,
        trim: true,
        default: "",
      },

      socialTitle: {
        type: String,
        trim: true,
        default: "",
        maxlength: 220,
      },

      socialDescription: {
        type: String,
        trim: true,
        default: "",
        maxlength: 320,
      },

      // ------------------------------------------------------
      // INDEXACIÓN
      // ------------------------------------------------------

      index: {
        type: Boolean,
        default: true,
      },

      follow: {
        type: Boolean,
        default: true,
      },
    },

    // ======================================================
    // ESTADO
    // ======================================================

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// NORMALIZACIONES
// ======================================================

pageSeoSchema.pre("save", function (next) {
  // Aseguramos que todas las rutas comiencen con "/"
  if (this.path) {
    const cleanPath = String(this.path).trim();

    this.path =
      cleanPath === "/"
        ? "/"
        : `/${cleanPath.replace(/^\/+|\/+$/g, "")}`;
  }

  // Normalizar clave
  if (this.pageKey) {
    this.pageKey = String(this.pageKey)
      .trim()
      .toLowerCase();
  }

  next();
});

// ======================================================
// ÍNDICES
// ======================================================

pageSeoSchema.index({
  isActive: 1,
  pageKey: 1,
});

// ======================================================
// EXPORT
// ======================================================

module.exports = mongoose.model(
  "PageSeo",
  pageSeoSchema
);