const express = require("express");
const router = express.Router();

const {
  routerPostOffer,
  routerGetOffer,
  routerGetByIdOffer,
  routerPutOffer,
  routerDeleteOffer,
} = require("../controllers/OffersController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// Públicas: necesarias para mostrar las ofertas en el sitio web.
router.get("/", routerGetOffer);
router.get("/:id", routerGetByIdOffer);

// Privadas: solo con sesión válida de administrador.
router.post("/", requireTrustedOrigin, requireAdmin, routerPostOffer);
router.put("/:id", requireTrustedOrigin, requireAdmin, routerPutOffer);
router.delete("/:id", requireTrustedOrigin, requireAdmin, routerDeleteOffer);

module.exports = router;