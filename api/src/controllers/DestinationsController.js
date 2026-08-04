const mongoose = require("mongoose");
const { z } = require("zod");

const Destinations = require("../models/Destinations");
const Offers = require("../models/Offers");

const destinationInputSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
  })
  .strict();

const normalizeName = (name) => name.replace(/\s+/g, " ").trim();

const findDestinationByName = (name) =>
  Destinations.findOne({ name }).collation({
    locale: "es",
    strength: 1,
  });

const isValidId = (id) => mongoose.isValidObjectId(id);

const sendError = (res, error) => {
  console.error("DestinationsController:", error);

  if (error?.code === 11000) {
    return res.status(409).json({
      message: "Ese destino ya existe.",
    });
  }

  return res.status(500).json({
    message: "No fue posible procesar el destino.",
  });
};

const routerPostDestination = async (req, res) => {
  try {
    const result = destinationInputSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "El nombre del destino no es válido.",
      });
    }

    const name = normalizeName(result.data.name);
    const exists = await findDestinationByName(name);

    if (exists) {
      return res.status(409).json({
        message: "Ese destino ya existe.",
        destination: exists,
      });
    }

    const destination = await Destinations.create({ name });

    return res.status(201).json(destination);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerGetDestination = async (req, res) => {
  try {
    const destinations = await Destinations.find().sort({ name: 1 });

    return res.status(200).json(destinations);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerGetByIdDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El identificador del destino no es válido.",
      });
    }

    const destination = await Destinations.findById(id);

    if (!destination) {
      return res.status(404).json({
        message: "Destino no encontrado.",
      });
    }

    return res.status(200).json(destination);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerPutDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El identificador del destino no es válido.",
      });
    }

    const result = destinationInputSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "El nombre del destino no es válido.",
      });
    }

    const name = normalizeName(result.data.name);
    const exists = await findDestinationByName(name);

    if (exists && exists._id.toString() !== id) {
      return res.status(409).json({
        message: "Ese destino ya existe.",
      });
    }

    const destination = await Destinations.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true, runValidators: true },
    );

    if (!destination) {
      return res.status(404).json({
        message: "Destino no encontrado.",
      });
    }

    return res.status(200).json(destination);
  } catch (error) {
    return sendError(res, error);
  }
};

const routerDeleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El identificador del destino no es válido.",
      });
    }

    const relatedOffers = await Offers.countDocuments({ destination: id });

    if (relatedOffers > 0) {
      return res.status(409).json({
        message:
          "No puedes eliminar este destino porque tiene ofertas relacionadas.",
      });
    }

    const destination = await Destinations.findByIdAndDelete(id);

    if (!destination) {
      return res.status(404).json({
        message: "Destino no encontrado.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = {
  routerPostDestination,
  routerGetDestination,
  routerGetByIdDestination,
  routerPutDestination,
  routerDeleteDestination,
};