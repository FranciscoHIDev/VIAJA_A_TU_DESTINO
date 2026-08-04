const express = require("express");
const router = express.Router();

const {
  routerPostHotel,
  routerGetHotel,
  routerGetByIdHotel,
  routerPutHotel,
  routerDeleteHotel,
} = require("../controllers/HotelController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// Públicas: visibles en tu sitio web.
router.get("/", routerGetHotel);
router.get("/:id", routerGetByIdHotel);

// Privadas: solo administrador autenticado.
router.post("/", requireTrustedOrigin, requireAdmin, routerPostHotel);
router.put("/:id", requireTrustedOrigin, requireAdmin, routerPutHotel);
router.delete("/:id", requireTrustedOrigin, requireAdmin, routerDeleteHotel);

module.exports = router;