const express = require("express");
const router = express.Router();

const {
  routerPostBanner,
  routerGetBanner,
  routerGetByIdBanner,
  routerPutBanner,
  routerDeleteBanner,
} = require("../controllers/BannerOfferController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// Públicos: necesarios para mostrar banners en el sitio.
router.get("/", routerGetBanner);
router.get("/:id", routerGetByIdBanner);

// Privados: solo para administrador autenticado.
router.post("/", requireTrustedOrigin, requireAdmin, routerPostBanner);
router.put("/:id", requireTrustedOrigin, requireAdmin, routerPutBanner);
router.delete(
  "/:id",
  requireTrustedOrigin,
  requireAdmin,
  routerDeleteBanner,
);

module.exports = router;