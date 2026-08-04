const mongoose = require("mongoose");
const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");

const Offers = require("../models/Offers");
const Destinations = require("../models/Destinations");

const categories = ["Vuelo", "Paquete", "Hotel", "Tour"];

const buyLinkSchema = z.object({
  departureDate: z.string().trim().min(1).max(40),
  returnDate: z.string().trim().min(1).max(40),
  price: z.string().trim().min(1).max(30),
  link: z.string().trim().url().max(2000),
});

const offerInputSchema = z
  .object({
    title: z.string().trim().min(20).max(80),
    summary: z.string().trim().min(10).max(300),
    description: z.string().trim().min(20).max(50000),

    category: z
      .object({
        name: z.enum(categories),
        image: z.string().url().max(1000).optional(),
      })
      .default({ name: "Paquete" }),

    destination: z.union([
      z.string().trim().min(2).max(80),
      z.object({
        name: z.string().trim().min(2).max(80),
      }),
    ]),

    price: z.string().trim().min(1).max(30),
    image: z.array(z.string().url()).min(1).max(20),
    sampleImages: z.array(z.string().url()).min(1).max(20),

    promotion: z.string().trim().max(100).optional().default(""),
    departure: z.string().trim().max(100).optional().default(""),
    arrival: z.string().trim().max(100).optional().default(""),
    availability: z.string().trim().max(120).optional().default(""),
    daysOfStay: z.string().trim().max(80).optional().default(""),
    hotel: z.string().trim().max(150).optional().default(""),

    buyLinks: z.array(buyLinkSchema).min(1).max(30),

    author: z.enum(["Francisco", "Susana"]).optional().default("Francisco"),
    active: z.boolean().optional(),
  })
  .strict();

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

const getDestinationName = (destination) => {
  if (typeof destination === "string") {
    return cleanText(destination);
  }

  return cleanText(destination?.name);
};

const prepareOffer = (body) => {
  const result = offerInputSchema.safeParse(body);

  if (!result.success) {
    return {
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  const { destination, ...offer } = result.data;
  const destinationName = getDestinationName(destination);

  if (destinationName.length < 2) {
    return {
      errors: [
        {
          field: "destination",
          message: "El destino es obligatorio.",
        },
      ],
    };
  }

  const description = cleanDescription(offer.description);

  if (cleanText(description).length < 20) {
    return {
      errors: [
        {
          field: "description",
          message: "La descripción no contiene contenido válido.",
        },
      ],
    };
  }

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
      link: item.link,
    })),
  };

  if (cleanOffer.active === undefined) {
    delete cleanOffer.active;
  }

  return {
    offer: cleanOffer,
    destinationName,
  };
};

const getOrCreateDestination = async (name) => {
  const cleanName = name.replace(/\s+/g, " ").trim();

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
    destination = await Destinations.create({ name: cleanName });
    return destination;
  } catch (error) {
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

const isValidId = (id) => mongoose.isValidObjectId(id);

const sendError = (res, error) => {
  console.error("OffersController:", error);

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return res.status(400).json({
      message: "Datos de oferta inválidos.",
    });
  }

  return res.status(500).json({
    message: "No fue posible procesar la oferta.",
  });
};

const routerPostOffer = async (req, res) => {
  try {
    const prepared = prepareOffer(req.body);

    if (prepared.errors) {
      return res.status(400).json({
        message: "Revisa los datos de la oferta.",
        errors: prepared.errors,
      });
    }

    const destination = await getOrCreateDestination(
      prepared.destinationName,
    );

    const newOffer = await Offers.create({
      ...prepared.offer,
      destination: destination._id,
    });

    await newOffer.populate("destination", { name: 1 });

    return res.status(201).json(newOffer);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerGetOffer = async (req, res) => {
  try {
    const offers = await Offers.find()
      .populate("destination", { name: 1 })
      .sort({ created: -1 });

    return res.status(200).json(offers);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerGetByIdOffer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El identificador de la oferta no es válido.",
      });
    }

    const offer = await Offers.findById(id).populate("destination", {
      name: 1,
    });

    if (!offer) {
      return res.status(404).json({
        message: "Oferta no encontrada.",
      });
    }

    return res.status(200).json(offer);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerPutOffer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El identificador de la oferta no es válido.",
      });
    }

    const prepared = prepareOffer(req.body);

    if (prepared.errors) {
      return res.status(400).json({
        message: "Revisa los datos de la oferta.",
        errors: prepared.errors,
      });
    }

    const destination = await getOrCreateDestination(
      prepared.destinationName,
    );

    const offer = await Offers.findByIdAndUpdate(
      id,
      {
        $set: {
          ...prepared.offer,
          destination: destination._id,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("destination", { name: 1 });

    if (!offer) {
      return res.status(404).json({
        message: "Oferta no encontrada.",
      });
    }

    return res.status(200).json(offer);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerDeleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El identificador de la oferta no es válido.",
      });
    }

    const offer = await Offers.findByIdAndDelete(id);

    if (!offer) {
      return res.status(404).json({
        message: "Oferta no encontrada.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = {
  routerPostOffer,
  routerGetOffer,
  routerGetByIdOffer,
  routerPutOffer,
  routerDeleteOffer,
};