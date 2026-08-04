const express = require("express");
const router = express.Router();

const {
  routerPostPackage,
  routerGetPackages,
  routerGetByIdPackage,
  routerDeletePackage,
  routerPutPackage,
} = require("../controllers/PackagesController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// Públicas: para mostrar paquetes en el sitio.
router.get("/", routerGetPackages);
router.get("/:id", routerGetByIdPackage);

// Privadas: requieren sesión de administrador.
router.post("/", requireTrustedOrigin, requireAdmin, routerPostPackage);
router.put("/:id", requireTrustedOrigin, requireAdmin, routerPutPackage);
router.delete(
  "/:id",
  requireTrustedOrigin,
  requireAdmin,
  routerDeletePackage,
);

module.exports = router;