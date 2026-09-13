const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // ======================================================
    // INFORMACIÓN PRINCIPAL
    // ======================================================

    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: 220,
    },

    slug: {
      type: String,
      required: [true, "El slug es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 700,
      default: "",
    },

    content: {
      type: String,
      required: [true, "El contenido es obligatorio"],
    },

    // ======================================================
    // AUTOR Y CLASIFICACIÓN
    // ======================================================

    author: {
      type: String,
      required: [true, "El autor es obligatorio"],
      trim: true,
      default: "Viaja a tu Destino",
    },

    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      trim: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    // ======================================================
    // IMAGEN PRINCIPAL
    // ======================================================

    featuredImage: {
      url: {
        type: String,
        trim: true,
        default: "",
      },

      alt: {
        type: String,
        trim: true,
        default: "",
        maxlength: 255,
      },
    },

    // ======================================================
    // PUBLICACIÓN
    // ======================================================

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },

    // ======================================================
    // SEO
    // ======================================================

    seo: {
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

      image: {
        type: String,
        trim: true,
        default: "",
      },

      canonicalUrl: {
        type: String,
        trim: true,
        default: "",
      },
    },

    // ======================================================
    // MÉTRICAS
    // ======================================================

    views: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// NORMALIZAR TAGS ANTES DE GUARDAR
// ======================================================

blogSchema.pre("save", function (next) {
  if (Array.isArray(this.tags)) {
    this.tags = [
      ...new Set(
        this.tags
          .map((tag) => String(tag).trim())
          .filter(Boolean)
      ),
    ];
  }

  next();
});

// ======================================================
// ÍNDICES
// ======================================================

// Artículos publicados ordenados por fecha
blogSchema.index({
  status: 1,
  publishedAt: -1,
});

// Artículos destacados
blogSchema.index({
  status: 1,
  isFeatured: 1,
  publishedAt: -1,
});

// Artículos por categoría
blogSchema.index({
  category: 1,
  status: 1,
  publishedAt: -1,
});

// Búsqueda de artículos
blogSchema.index(
  {
    title: "text",
    excerpt: "text",
    content: "text",
    tags: "text",
  },
  {
    name: "blog_search",
    weights: {
      title: 10,
      tags: 6,
      excerpt: 4,
      content: 1,
    },
  }
);

// ======================================================
// EXPORT
// ======================================================

module.exports = mongoose.model("Blog", blogSchema);