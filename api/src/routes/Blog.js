const express = require("express");

const router = express.Router();

const {
  routerPostBlog,
  routerGetBlog,
  routerGetByIdBlog,
  routerGetPublishedBlog,
  routerGetPublishedBySlugBlog,
  routerPutBlog,
  routerDeleteBlog,
} = require("../controllers/BlogController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// ======================================================
// PÚBLICAS
// ======================================================

// Todos los artículos publicados
router.get(
  "/",
  routerGetPublishedBlog
);

// ======================================================
// PRIVADAS - ADMIN
// Deben ir antes de "/:slug"
// ======================================================

// Publicados + borradores + archivados
router.get(
  "/admin",
  requireAdmin,
  routerGetBlog
);

// Artículo por ID para edición
router.get(
  "/admin/:id",
  requireAdmin,
  routerGetByIdBlog
);

// ======================================================
// PÚBLICA POR SLUG
// ======================================================

router.get(
  "/:slug",
  routerGetPublishedBySlugBlog
);

// ======================================================
// CREAR
// ======================================================

router.post(
  "/",
  requireTrustedOrigin,
  requireAdmin,
  routerPostBlog
);

// ======================================================
// ACTUALIZAR
// ======================================================

router.put(
  "/:id",
  requireTrustedOrigin,
  requireAdmin,
  routerPutBlog
);

// ======================================================
// ELIMINAR
// ======================================================

router.delete(
  "/:id",
  requireTrustedOrigin,
  requireAdmin,
  routerDeleteBlog
);

module.exports = router;