const mongoose = require("mongoose");
const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");

const Offers = require("../models/Offers");
const Destinations = require("../models/Destinations");

// ======================================================
// CONFIGURACIÓN
// ======================================================

const categories = ["Vuelo", "Paquete", "Hotel", "Tour"];

// ======================================================
// VALIDACIÓN BUY LINKS
// ======================================================

const buyLinkSchema = z
  .object({
    departureDate: z
      .string()
      .trim()
      .min(1, "La fecha de entrada es obligatoria.")
      .max(40, "La fecha de entrada no puede superar 40 caracteres."),

    returnDate: z
      .string()
      .trim()
      .min(1, "La fecha de salida es obligatoria.")
      .max(40, "La fecha de salida no puede superar 40 caracteres."),

    price: z
      .string()
      .trim()
      .min(1, "El precio de esta fecha es obligatorio.")
      .max(30, "El precio no puede superar 30 caracteres."),

    link: z
      .string()
      .trim()
      .min(1, "El enlace de compra es obligatorio.")
      .url("El enlace de compra debe ser una URL válida.")
      .max(2000, "El enlace de compra es demasiado largo."),
  })
  .strict();

// ======================================================
// VALIDACIÓN GENERAL DE OFERTA
// ======================================================

const offerInputSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(20, "El título debe tener mínimo 20 caracteres.")
      .max(80, "El título no puede superar 80 caracteres."),

    summary: z
      .string()
      .trim()
      .min(10, "El resumen debe tener mínimo 10 caracteres.")
      .max(300, "El resumen no puede superar 300 caracteres."),

    description: z
      .string()
      .trim()
      .min(20, "La descripción debe tener mínimo 20 caracteres.")
      .max(50000, "La descripción es demasiado larga."),

    category: z
      .object({
        name: z.enum(categories, {
          message:
            "La categoría debe ser Vuelo, Paquete, Hotel o Tour.",
        }),

        image: z
          .string()
          .url("La imagen de la categoría debe ser una URL válida.")
          .max(1000, "La URL de la categoría es demasiado larga.")
          .optional(),
      })
      .strict()
      .default({
        name: "Paquete",
      }),

    destination: z.union([
      z
        .string()
        .trim()
        .min(2, "El destino debe tener mínimo 2 caracteres.")
        .max(80, "El destino no puede superar 80 caracteres."),

      z
        .object({
          name: z
            .string()
            .trim()
            .min(2, "El destino debe tener mínimo 2 caracteres.")
            .max(80, "El destino no puede superar 80 caracteres."),
        })
        .strict(),
    ]),

    price: z
      .string()
      .trim()
      .min(1, "El precio principal es obligatorio.")
      .max(30, "El precio principal no puede superar 30 caracteres."),

    image: z
      .array(
        z
          .string()
          .url("Una de las imágenes principales tiene una URL inválida."),
      )
      .min(1, "Debes agregar al menos una imagen principal.")
      .max(20, "Solo puedes agregar hasta 20 imágenes principales."),

    sampleImages: z
      .array(
        z
          .string()
          .url("Una de las imágenes de referencia tiene una URL inválida."),
      )
      .min(1, "Debes agregar al menos una imagen de referencia.")
      .max(20, "Solo puedes agregar hasta 20 imágenes de referencia."),

    promotion: z
      .string()
      .trim()
      .max(100, "La promoción no puede superar 100 caracteres.")
      .optional()
      .default(""),

    departure: z
      .string()
      .trim()
      .max(100, "La salida no puede superar 100 caracteres.")
      .optional()
      .default(""),

    arrival: z
      .string()
      .trim()
      .max(100, "La llegada no puede superar 100 caracteres.")
      .optional()
      .default(""),

    availability: z
      .string()
      .trim()
      .max(120, "La disponibilidad no puede superar 120 caracteres.")
      .optional()
      .default(""),

    daysOfStay: z
      .string()
      .trim()
      .max(80, "Los días de estancia no pueden superar 80 caracteres.")
      .optional()
      .default(""),

    hotel: z
      .string()
      .trim()
      .max(150, "El nombre del hotel no puede superar 150 caracteres.")
      .optional()
      .default(""),

    buyLinks: z
      .array(buyLinkSchema)
      .min(1, "Debes agregar al menos una fecha y enlace de compra.")
      .max(30, "Solo puedes agregar hasta 30 fechas."),

    author: z
      .enum(["Francisco", "Susana"], {
        message: "El autor debe ser Francisco o Susana.",
      })
      .optional()
      .default("Francisco"),

    active: z.boolean({
      message: "El campo active debe ser true o false.",
    }).optional(),
  })
  .strict();

// ======================================================
// SANITIZACIÓN
// ======================================================

const cleanText = (value) =>
  sanitizeHtml(value || "", {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();

const cleanDescription = (value) =>
  sanitizeHtml(value || "", {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "blockquote",
      "a",
    ],

    allowedAttributes: {
      a: ["href", "target", "rel"],
    },

    allowedSchemes: ["http", "https", "mailto"],

    disallowedTagsMode: "discard",
  }).trim();

// ======================================================
// DESTINO
// ======================================================

const getDestinationName = (destination) => {
  if (typeof destination === "string") {
    return cleanText(destination);
  }

  return cleanText(destination?.name);
};

// ======================================================
// FORMATEAR ERRORES DE ZOD
// ======================================================

const formatZodErrors = (issues = []) => {
  return issues.flatMap((issue) => {
    /*
     * .strict() genera unrecognized_keys cuando el frontend
     * manda campos que no existen en el schema.
     */

    if (
      issue.code === "unrecognized_keys" &&
      Array.isArray(issue.keys)
    ) {
      return issue.keys.map((key) => ({
        field:
          issue.path?.length > 0
            ? `${issue.path.join(".")}.${key}`
            : key,

        code: issue.code,

        message: `El campo "${key}" no está permitido por el backend.`,
      }));
    }

    return [
      {
        field:
          issue.path?.length > 0
            ? issue.path.join(".")
            : "body",

        code: issue.code || "validation_error",

        message: issue.message,
      },
    ];
  });
};

// ======================================================
// PREPARAR OFERTA
// ======================================================

const prepareOffer = (body) => {
  const result = offerInputSchema.safeParse(body);

  // ==================================================
  // ERROR DE ZOD
  // ==================================================

  if (!result.success) {
    const errors = formatZodErrors(result.error.issues);

    return {
      success: false,
      type: "ZOD_VALIDATION_ERROR",
      errors,
    };
  }

  const { destination, ...offer } = result.data;

  const destinationName = getDestinationName(destination);

  // ==================================================
  // VALIDACIÓN DESTINO
  // ==================================================

  if (destinationName.length < 2) {
    return {
      success: false,
      type: "DESTINATION_VALIDATION_ERROR",

      errors: [
        {
          field: "destination",
          code: "invalid_destination",
          message: "El destino es obligatorio.",
        },
      ],
    };
  }

  // ==================================================
  // SANITIZAR DESCRIPCIÓN
  // ==================================================

  const description = cleanDescription(offer.description);

  /*
   * cleanDescription conserva HTML.
   * cleanText elimina HTML para verificar que realmente
   * haya contenido y no solamente etiquetas vacías.
   */

  if (cleanText(description).length < 20) {
    return {
      success: false,
      type: "DESCRIPTION_VALIDATION_ERROR",

      errors: [
        {
          field: "description",
          code: "invalid_description",
          message:
            "La descripción debe contener al menos 20 caracteres de texto válido.",
        },
      ],
    };
  }

  // ==================================================
  // LIMPIAR INFORMACIÓN
  // ==================================================

  const cleanOffer = {
    ...offer,

    title: cleanText(offer.title),

    summary: cleanText(offer.summary),

    description,

    price: cleanText(offer.price),

    promotion: cleanText(offer.promotion),

    departure: cleanText(offer.departure),

    arrival: cleanText(offer.arrival),

    availability: cleanText(offer.availability),

    daysOfStay: cleanText(offer.daysOfStay),

    hotel: cleanText(offer.hotel),

    buyLinks: offer.buyLinks.map((item) => ({
      departureDate: cleanText(item.departureDate),

      returnDate: cleanText(item.returnDate),

      price: cleanText(item.price),

      link: item.link.trim(),
    })),
  };

  if (cleanOffer.active === undefined) {
    delete cleanOffer.active;
  }

  return {
    success: true,
    offer: cleanOffer,
    destinationName,
  };
};

// ======================================================
// CREAR O BUSCAR DESTINO
// ======================================================

const getOrCreateDestination = async (name) => {
  const cleanName = name
    .replace(/\s+/g, " ")
    .trim();

  let destination = await Destinations.findOne({
    name: cleanName,
  }).collation({
    locale: "es",
    strength: 1,
  });

  if (destination) {
    return destination;
  }

  try {
    destination = await Destinations.create({
      name: cleanName,
    });

    return destination;
  } catch (error) {
    /*
     * Puede ocurrir que dos peticiones intenten crear
     * el mismo destino prácticamente al mismo tiempo.
     */

    if (error?.code === 11000) {
      destination = await Destinations.findOne({
        name: cleanName,
      }).collation({
        locale: "es",
        strength: 1,
      });

      if (destination) {
        return destination;
      }
    }

    throw error;
  }
};

// ======================================================
// VALIDAR OBJECT ID
// ======================================================

const isValidId = (id) =>
  mongoose.isValidObjectId(id);

// ======================================================
// MANEJO GLOBAL DE ERRORES DEL CONTROLLER
// ======================================================

const sendError = (
  res,
  error,
  context = "OffersController",
) => {
  // ==================================================
  // LOG COMPLETO EN VERCEL / SERVIDOR
  // ==================================================

  console.error("\n");
  console.error("========================================");
  console.error(`ERROR: ${context}`);
  console.error("========================================");

  console.error("Nombre:", error?.name);

  console.error("Mensaje:", error?.message);

  console.error("Código:", error?.code);

  if (error?.path) {
    console.error("Path:", error.path);
  }

  if (error?.value !== undefined) {
    console.error("Value:", error.value);
  }

  if (error?.keyValue) {
    console.error("KeyValue:", error.keyValue);
  }

  if (error?.errors) {
    console.error("Errors:", error.errors);
  }

  console.error("Stack:", error?.stack);

  console.error("========================================");
  console.error("\n");

  // ==================================================
  // ERROR DE VALIDACIÓN MONGOOSE
  // ==================================================

  if (error?.name === "ValidationError") {
    const errors = Object.values(
      error.errors || {},
    ).map((item) => ({
      field: item?.path || "unknown",

      code:
        item?.kind ||
        "mongoose_validation",

      message:
        item?.message ||
        "El campo contiene un valor inválido.",

      value:
        item?.value !== undefined
          ? String(item.value)
          : undefined,
    }));

    return res.status(400).json({
      success: false,

      type: "MONGOOSE_VALIDATION_ERROR",

      message:
        "MongoDB rechazó uno o más campos de la oferta.",

      errors,
    });
  }

  // ==================================================
  // CAST ERROR DE MONGOOSE
  // ==================================================

  if (error?.name === "CastError") {
    return res.status(400).json({
      success: false,

      type: "MONGOOSE_CAST_ERROR",

      message: `El campo "${error.path}" contiene un valor inválido.`,

      errors: [
        {
          field: error.path || "unknown",

          code: "cast_error",

          message:
            error.message ||
            "No fue posible convertir el valor.",

          value:
            error.value !== undefined
              ? String(error.value)
              : undefined,
        },
      ],
    });
  }

  // ==================================================
  // DUPLICADO MONGODB
  // ==================================================

  if (error?.code === 11000) {
    const duplicatedFields = Object.keys(
      error?.keyValue ||
        error?.keyPattern ||
        {},
    );

    const errors = duplicatedFields.map(
      (field) => ({
        field,

        code: "duplicate",

        message: `El valor del campo "${field}" ya existe.`,

        value:
          error?.keyValue?.[field] !== undefined
            ? String(error.keyValue[field])
            : undefined,
      }),
    );

    return res.status(409).json({
      success: false,

      type: "DUPLICATE_KEY_ERROR",

      message:
        duplicatedFields.length > 0
          ? `Ya existe un registro con: ${duplicatedFields.join(", ")}.`
          : "Ya existe un registro con esos datos.",

      errors,
    });
  }

  // ==================================================
  // ERROR INTERNO
  // ==================================================

  return res.status(500).json({
    success: false,

    type: "INTERNAL_SERVER_ERROR",

    message:
      "No fue posible procesar la oferta. Revisa los logs del servidor.",
  });
};

// ======================================================
// POST - CREAR OFERTA
// ======================================================

const routerPostOffer = async (req, res) => {
  try {
    console.log("\n");
    console.log("========================================");
    console.log("POST /api/offers");
    console.log("========================================");

    console.log(
      "Campos recibidos:",
      Object.keys(req.body || {}),
    );

    console.log(
      "Categoría recibida:",
      req.body?.category,
    );

    console.log(
      "Destino recibido:",
      req.body?.destination,
    );

    console.log(
      "Cantidad imágenes:",
      Array.isArray(req.body?.image)
        ? req.body.image.length
        : "NO ES ARRAY",
    );

    console.log(
      "Cantidad sampleImages:",
      Array.isArray(req.body?.sampleImages)
        ? req.body.sampleImages.length
        : "NO ES ARRAY",
    );

    console.log(
      "Cantidad buyLinks:",
      Array.isArray(req.body?.buyLinks)
        ? req.body.buyLinks.length
        : "NO ES ARRAY",
    );

    // ==================================================
    // VALIDAR BODY
    // ==================================================

    const prepared = prepareOffer(req.body);

    if (!prepared.success) {
      console.error(
        "VALIDACIÓN DE OFERTA RECHAZADA",
      );

      console.error(
        JSON.stringify(
          prepared.errors,
          null,
          2,
        ),
      );

      console.error(
        "========================================",
      );

      return res.status(400).json({
        success: false,

        type: prepared.type,

        message:
          "La oferta contiene datos inválidos.",

        errors: prepared.errors,
      });
    }

    // ==================================================
    // DESTINO
    // ==================================================

    const destination =
      await getOrCreateDestination(
        prepared.destinationName,
      );

    // ==================================================
    // CREAR
    // ==================================================

    const newOffer = await Offers.create({
      ...prepared.offer,

      destination: destination._id,
    });

    await newOffer.populate(
      "destination",
      {
        name: 1,
      },
    );

    console.log(
      "Oferta creada correctamente:",
      newOffer._id,
    );

    console.log(
      "========================================",
    );

    /*
     * Conservamos la respuesta original.
     * No devolvemos { offer: newOffer }
     * para evitar romper código existente.
     */

    return res
      .status(201)
      .json(newOffer);
  } catch (error) {
    return sendError(
      res,
      error,
      "POST /api/offers",
    );
  }
};

// ======================================================
// GET - TODAS LAS OFERTAS
// ======================================================

const routerGetOffer = async (req, res) => {
  try {
    const offers = await Offers.find()
      .populate("destination", {
        name: 1,
      })
      .sort({
        created: -1,
      });

    return res
      .status(200)
      .json(offers);
  } catch (error) {
    return sendError(
      res,
      error,
      "GET /api/offers",
    );
  }
};

// ======================================================
// GET - OFERTA POR ID O SLUG
// ======================================================

const routerGetByIdOffer = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    const identifier = String(
      id || "",
    ).trim();

    if (!identifier) {
      return res.status(400).json({
        success: false,

        type: "MISSING_IDENTIFIER",

        message:
          "Debes indicar una oferta.",
      });
    }

    let offer;

    // ==================================================
    // BUSCAR POR OBJECT ID
    // ==================================================

    if (isValidId(identifier)) {
      offer = await Offers.findById(
        identifier,
      ).populate("destination", {
        name: 1,
      });
    }

    // ==================================================
    // BUSCAR POR SLUG
    // ==================================================

    else {
      offer = await Offers.findOne({
        slug: identifier.toLowerCase(),
      }).populate("destination", {
        name: 1,
      });
    }

    if (!offer) {
      return res.status(404).json({
        success: false,

        type: "OFFER_NOT_FOUND",

        message:
          "Oferta no encontrada.",
      });
    }

    return res
      .status(200)
      .json(offer);
  } catch (error) {
    return sendError(
      res,
      error,
      "GET /api/offers/:id",
    );
  }
};

// ======================================================
// PUT - ACTUALIZAR OFERTA
// ======================================================

const routerPutOffer = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    console.log("\n");
    console.log("========================================");
    console.log(`PUT /api/offers/${id}`);
    console.log("========================================");

    console.log(
      "Campos recibidos:",
      Object.keys(req.body || {}),
    );

    // ==================================================
    // VALIDAR ID
    // ==================================================

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,

        type: "INVALID_ID",

        message:
          "El identificador de la oferta no es válido.",

        errors: [
          {
            field: "id",

            code: "invalid_id",

            message: `El valor "${id}" no es un ObjectId válido.`,
          },
        ],
      });
    }

    // ==================================================
    // VALIDAR BODY
    // ==================================================

    const prepared = prepareOffer(req.body);

    if (!prepared.success) {
      console.error(
        "VALIDACIÓN DE OFERTA RECHAZADA",
      );

      console.error(
        JSON.stringify(
          prepared.errors,
          null,
          2,
        ),
      );

      console.error(
        "========================================",
      );

      return res.status(400).json({
        success: false,

        type: prepared.type,

        message:
          "La oferta contiene datos inválidos.",

        errors: prepared.errors,
      });
    }

    // ==================================================
    // BUSCAR / CREAR DESTINO
    // ==================================================

    const destination =
      await getOrCreateDestination(
        prepared.destinationName,
      );

    // ==================================================
    // BUSCAR OFERTA
    // ==================================================

    const offer =
      await Offers.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,

        type: "OFFER_NOT_FOUND",

        message:
          "Oferta no encontrada.",
      });
    }

    // ==================================================
    // ACTUALIZAR
    // ==================================================

    offer.set({
      ...prepared.offer,

      destination: destination._id,
    });

    /*
     * save() permite ejecutar los middleware
     * del modelo, incluyendo el slug.
     */

    await offer.save();

    await offer.populate(
      "destination",
      {
        name: 1,
      },
    );

    console.log(
      "Oferta actualizada correctamente:",
      offer._id,
    );

    console.log(
      "========================================",
    );

    /*
     * Conservamos la respuesta original
     * para no romper el frontend.
     */

    return res
      .status(200)
      .json(offer);
  } catch (error) {
    return sendError(
      res,
      error,
      "PUT /api/offers/:id",
    );
  }
};

// ======================================================
// DELETE - ELIMINAR OFERTA
// ======================================================

const routerDeleteOffer = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,

        type: "INVALID_ID",

        message:
          "El identificador de la oferta no es válido.",

        errors: [
          {
            field: "id",

            code: "invalid_id",

            message: `El valor "${id}" no es un ObjectId válido.`,
          },
        ],
      });
    }

    const offer =
      await Offers.findByIdAndDelete(id);

    if (!offer) {
      return res.status(404).json({
        success: false,

        type: "OFFER_NOT_FOUND",

        message:
          "Oferta no encontrada.",
      });
    }

    return res
      .status(204)
      .send();
  } catch (error) {
    return sendError(
      res,
      error,
      "DELETE /api/offers/:id",
    );
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  routerPostOffer,
  routerGetOffer,
  routerGetByIdOffer,
  routerPutOffer,
  routerDeleteOffer,
};