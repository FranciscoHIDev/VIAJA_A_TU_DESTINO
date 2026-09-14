const mongoose = require("mongoose");

const Blog = require("../models/Blog");

// ======================================================
// CONFIGURACIÓN
// ======================================================

const SITE_URL =
  process.env.FRONTEND_URL ||
  "https://www.viajaatudestino.com";

const FALLBACK_IMAGE =
  process.env.SOCIAL_FALLBACK_IMAGE ||
  "https://res.cloudinary.com/duaysiozi/image/upload/v1784166871/f6thrmw2fynxpyo0ak5e.png";

// ======================================================
// ESCAPAR HTML
// ======================================================

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// ======================================================
// QUITAR HTML
// ======================================================

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

// ======================================================
// NORMALIZAR URL
// ======================================================

const normalizeAbsoluteUrl = (
  value,
  fallback = ""
) => {
  const candidate =
    String(
      value || ""
    ).trim();

  if (!candidate) {
    return fallback;
  }

  try {
    const url =
      new URL(
        candidate,
        SITE_URL
      );

    if (
      ![
        "http:",
        "https:",
      ].includes(
        url.protocol
      )
    ) {
      return fallback;
    }

    return url.href;
  } catch {
    return fallback;
  }
};

// ======================================================
// OBTENER TÍTULO
// ======================================================

const getArticleTitle = (
  blog
) =>
  stripHtml(
    blog?.seo
      ?.socialTitle ||
      blog?.seo
        ?.title ||
      blog?.title ||
      "Blog de Viaja a tu Destino"
  ).slice(
    0,
    220
  );

// ======================================================
// OBTENER DESCRIPCIÓN
// ======================================================

const getArticleDescription = (
  blog
) =>
  stripHtml(
    blog?.seo
      ?.socialDescription ||
      blog?.seo
        ?.description ||
      blog?.excerpt ||
      blog?.content ||
      "Descubre consejos, guías y recomendaciones de viaje con Viaja a tu Destino."
  ).slice(
    0,
    320
  );

// ======================================================
// GENERAR HTML SOCIAL
// ======================================================

const buildHtml = ({
  title,
  description,
  canonicalUrl,
  image,
  imageAlt,
  publishedAt,
  modifiedAt,
  index,
  follow,
}) => {
  const safeTitle =
    escapeHtml(
      title
    );

  const safeDescription =
    escapeHtml(
      description
    );

  const safeCanonicalUrl =
    escapeHtml(
      canonicalUrl
    );

  const safeImage =
    escapeHtml(
      image
    );

  const safeImageAlt =
    escapeHtml(
      imageAlt ||
        title
    );

  const robots =
    `${index ? "index" : "noindex"}, ${
      follow
        ? "follow"
        : "nofollow"
    }, max-image-preview:large`;

  // ====================================================
  // FECHA DE PUBLICACIÓN
  // ====================================================

  let publishedMeta =
    "";

  if (
    publishedAt
  ) {
    const date =
      new Date(
        publishedAt
      );

    if (
      !Number.isNaN(
        date.getTime()
      )
    ) {
      publishedMeta = `
  <meta
    property="article:published_time"
    content="${escapeHtml(
      date.toISOString()
    )}"
  />`;
    }
  }

  // ====================================================
  // FECHA DE MODIFICACIÓN
  // ====================================================

  let modifiedMeta =
    "";

  if (
    modifiedAt
  ) {
    const date =
      new Date(
        modifiedAt
      );

    if (
      !Number.isNaN(
        date.getTime()
      )
    ) {
      modifiedMeta = `
  <meta
    property="article:modified_time"
    content="${escapeHtml(
      date.toISOString()
    )}"
  />`;
    }
  }

  // ====================================================
  // HTML
  // ====================================================

  return `<!doctype html>
<html lang="es-MX">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>${safeTitle}</title>

  <meta
    name="description"
    content="${safeDescription}"
  />

  <meta
    name="robots"
    content="${robots}"
  />

  <meta
    name="googlebot"
    content="${robots}"
  />

  <link
    rel="canonical"
    href="${safeCanonicalUrl}"
  />

  <!-- ================================================
       OPEN GRAPH
  ================================================= -->

  <meta
    property="og:locale"
    content="es_MX"
  />

  <meta
    property="og:site_name"
    content="Viaja a tu Destino"
  />

  <meta
    property="og:type"
    content="article"
  />

  <meta
    property="og:title"
    content="${safeTitle}"
  />

  <meta
    property="og:description"
    content="${safeDescription}"
  />

  <meta
    property="og:url"
    content="${safeCanonicalUrl}"
  />

  <meta
    property="og:image"
    content="${safeImage}"
  />

  <meta
    property="og:image:secure_url"
    content="${safeImage}"
  />

  <meta
    property="og:image:alt"
    content="${safeImageAlt}"
  />

  ${publishedMeta}

  ${modifiedMeta}

  <!-- ================================================
       TWITTER / X
  ================================================= -->

  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content="${safeTitle}"
  />

  <meta
    name="twitter:description"
    content="${safeDescription}"
  />

  <meta
    name="twitter:image"
    content="${safeImage}"
  />

  <meta
    name="twitter:image:alt"
    content="${safeImageAlt}"
  />

</head>

<body>

  <main>

    <article>

      <h1>
        ${safeTitle}
      </h1>

      <p>
        ${safeDescription}
      </p>

      <p>
        <a href="${safeCanonicalUrl}">
          Ver artículo en Viaja a tu Destino
        </a>
      </p>

    </article>

  </main>

</body>

</html>`;
};

// ======================================================
// GET /api/social/blog/:slug
//
// HTML ESPECIAL PARA:
//
// Facebook
// WhatsApp
// X / Twitter
// LinkedIn
// Telegram
// Discord
// etc.
// ======================================================

const routerGetBlogSocialPreview =
  async (
    req,
    res
  ) => {
    try {
      // ==================================================
      // SLUG
      // ==================================================

      const slug =
        String(
          req.params
            .slug ||
            ""
        )
          .trim()
          .toLowerCase();

      if (!slug) {
        return res
          .status(400)
          .type("html")
          .send(`
<!doctype html>
<html>
<body>
  Artículo inválido.
</body>
</html>
          `);
      }

      // ==================================================
      // BUSCAR ARTÍCULO
      // ==================================================

      /*
       * mongoose.trusted es importante porque
       * tu proyecto tiene sanitizeFilter activado.
       */

      const blog =
        await Blog.findOne({
          slug,

          status:
            "published",

          publishedAt:
            mongoose.trusted({
              $lte:
                new Date(),
            }),
        }).lean();

      if (!blog) {
        return res
          .status(404)
          .type("html")
          .send(`
<!doctype html>
<html>
<body>
  Artículo no encontrado.
</body>
</html>
          `);
      }

      // ==================================================
      // URL CANÓNICA
      // ==================================================

      const canonicalUrl =
        normalizeAbsoluteUrl(
          blog?.seo
            ?.canonicalUrl,

          `${SITE_URL.replace(
            /\/+$/,
            ""
          )}/blog/${encodeURIComponent(
            blog.slug
          )}`
        );

      // ==================================================
      // IMAGEN SOCIAL
      // ==================================================

      const image =
        normalizeAbsoluteUrl(
          blog?.seo
            ?.image ||
            blog
              ?.featuredImage
              ?.url,

          FALLBACK_IMAGE
        );

      // ==================================================
      // TÍTULO
      // ==================================================

      const title =
        getArticleTitle(
          blog
        );

      // ==================================================
      // DESCRIPCIÓN
      // ==================================================

      const description =
        getArticleDescription(
          blog
        );

      // ==================================================
      // ALT
      // ==================================================

      const imageAlt =
        stripHtml(
          blog
            ?.featuredImage
            ?.alt ||
            blog?.title ||
            title
        ) ||
        title;

      // ==================================================
      // INDEXACIÓN
      // ==================================================

      const index =
        blog?.seo
          ?.index !==
        false;

      const follow =
        blog?.seo
          ?.follow !==
        false;

      // ==================================================
      // GENERAR HTML
      // ==================================================

      const html =
        buildHtml({
          title,
          description,
          canonicalUrl,
          image,
          imageAlt,

          publishedAt:
            blog.publishedAt,

          modifiedAt:
            blog.updatedAt,

          index,
          follow,
        });

      // ==================================================
      // HEADERS
      // ==================================================

      res.set({
        "Content-Type":
          "text/html; charset=utf-8",

        /*
         * Caché corta para que podamos actualizar
         * SEO sin esperar demasiado.
         */
        "Cache-Control":
          "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      });

      return res
        .status(200)
        .send(
          html
        );
    } catch (error) {
      console.error(
        "ERROR SOCIAL PREVIEW BLOG:",
        error
      );

      return res
        .status(500)
        .type("html")
        .send(`
<!doctype html>
<html>
<body>
  No fue posible generar la vista previa.
</body>
</html>
        `);
    }
  };

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  routerGetBlogSocialPreview,
};