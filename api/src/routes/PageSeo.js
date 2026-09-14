const express =
  require("express");

const router =
  express.Router();

const {
  routerPostPageSeo,
  routerGetPageSeo,
  routerGetByPageKeyAdmin,
  routerGetPublicPageSeo,
  routerPutPageSeo,
  routerDeletePageSeo,
  routerInitializePageSeo,
} = require("../controllers/PageSeoController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

// ======================================================
// ADMIN - LISTAR TODAS LAS PÁGINAS SEO
// ======================================================

router.get(
  "/admin",
  requireAdmin,
  routerGetPageSeo
);

// ======================================================
// ADMIN - OBTENER UNA PÁGINA SEO
//
// IMPORTANTE:
// Debe estar antes de /:pageKey
// ======================================================

router.get(
  "/admin/:pageKey",
  requireAdmin,
  routerGetByPageKeyAdmin
);

// ======================================================
// ADMIN - INICIALIZAR SEO DEL SITIO
//
// IMPORTANTE:
// Debe estar antes de /:pageKey
// ======================================================

router.post(
  "/initialize",
  requireTrustedOrigin,
  requireAdmin,
  routerInitializePageSeo
);

// ======================================================
// PÚBLICA - OBTENER SEO DE UNA PÁGINA
// ======================================================

router.get(
  "/:pageKey",
  routerGetPublicPageSeo
);

// ======================================================
// ADMIN - CREAR CONFIGURACIÓN SEO
// ======================================================

router.post(
  "/",
  requireTrustedOrigin,
  requireAdmin,
  routerPostPageSeo
);

// ======================================================
// ADMIN - ACTUALIZAR CONFIGURACIÓN SEO
// ======================================================

router.put(
  "/:pageKey",
  requireTrustedOrigin,
  requireAdmin,
  routerPutPageSeo
);

// ======================================================
// ADMIN - ELIMINAR CONFIGURACIÓN SEO
// ======================================================

router.delete(
  "/:pageKey",
  requireTrustedOrigin,
  requireAdmin,
  routerDeletePageSeo
);

// ======================================================
// EXPORT
// ======================================================

module.exports =
  router;