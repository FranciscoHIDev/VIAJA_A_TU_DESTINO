const express = require("express");
const router = express.Router();

const {
  routerPostDestination,
  routerGetDestination,
  routerGetByIdDestination,
  routerPutDestination,
  routerDeleteDestination,
} = require("../controllers/DestinationsController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// Públicas: para mostrar destinos en la página web.
router.get("/", routerGetDestination);
router.get("/:id", routerGetByIdDestination);

// Privadas: solo administrador autenticado.
router.post(
  "/",
  requireTrustedOrigin,
  requireAdmin,
  routerPostDestination,
);

router.put(
  "/:id",
  requireTrustedOrigin,
  requireAdmin,
  routerPutDestination,
);

router.delete(
  "/:id",
  requireTrustedOrigin,
  requireAdmin,
  routerDeleteDestination,
);

module.exports = router;