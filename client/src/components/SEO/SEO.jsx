import { Helmet } from "react-helmet-async";

// ======================================================
// CONFIGURACIÓN GENERAL
// ======================================================

const SITE_NAME = "Viaja a tu Destino";

const SITE_URL = "https://www.viajaatudestino.com";

// Por ahora usamos vacío.
// Después pondremos aquí nuestra imagen social 1200x630.
const DEFAULT_IMAGE = "";

// ======================================================
// HELPERS
// ======================================================

const normalizeUrl = (url = "") => {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

const buildRobots = (index = true, follow = true) => {
  const values = [
    index ? "index" : "noindex",

    follow ? "follow" : "nofollow",

    "max-image-preview:large",
  ];

  return values.join(", ");
};

// ======================================================
// SEO
// ======================================================

const SEO = ({
  title = "",
  description = "",
  canonicalUrl = "",
  image = "",
  socialTitle = "",
  socialDescription = "",

  index = true,
  follow = true,

  type = "website",

  schema = null,

  appendSiteName = true,
}) => {
  // ====================================================
  // TITLE
  // ====================================================

  const cleanTitle = String(title || "").trim();

  const alreadyHasBrand = cleanTitle
    .toLowerCase()
    .includes(SITE_NAME.toLowerCase());

  const finalTitle = cleanTitle
    ? appendSiteName && !alreadyHasBrand
      ? `${cleanTitle} | ${SITE_NAME}`
      : cleanTitle
    : `Cazadores de Ofertas de Viajes | ${SITE_NAME}`;

  // ====================================================
  // DESCRIPTION
  // ====================================================

  const finalDescription = String(description || "").trim();

  // ====================================================
  // URL
  // ====================================================

  const finalCanonical = normalizeUrl(canonicalUrl);

  // ====================================================
  // SOCIAL
  // ====================================================

  const finalSocialTitle = String(socialTitle || "").trim() || finalTitle;

  const finalSocialDescription =
    String(socialDescription || "").trim() || finalDescription;

  const finalImage = normalizeUrl(image || DEFAULT_IMAGE);

  // ====================================================
  // ROBOTS
  // ====================================================

  const robots = buildRobots(index, follow);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <Helmet>
      {/* =================================================
          HTML
      ================================================= */}

      <html lang="es-MX" />

      {/* =================================================
          TITLE
      ================================================= */}

      <title>{finalTitle}</title>

      {/* =================================================
          SEO GENERAL
      ================================================= */}

      {finalDescription && (
        <meta name="description" content={finalDescription} />
      )}

      <meta name="robots" content={robots} />

      <meta name="googlebot" content={robots} />

      {/* =================================================
          CANONICAL
      ================================================= */}

      {finalCanonical && <link rel="canonical" href={finalCanonical} />}

      {/* =================================================
          OPEN GRAPH
      ================================================= */}

      <meta property="og:site_name" content={SITE_NAME} />

      <meta property="og:locale" content="es_MX" />

      <meta property="og:type" content={type} />

      <meta property="og:title" content={finalSocialTitle} />

      {finalSocialDescription && (
        <meta property="og:description" content={finalSocialDescription} />
      )}

      {finalCanonical && <meta property="og:url" content={finalCanonical} />}

      {finalImage && <meta property="og:image" content={finalImage} />}

      {finalImage && (
        <meta property="og:image:secure_url" content={finalImage} />
      )}

      {finalImage && (
        <meta property="og:image:alt" content={finalSocialTitle} />
      )}

      {/* =================================================
          TWITTER / X
      ================================================= */}

      <meta
        name="twitter:card"
        content={finalImage ? "summary_large_image" : "summary"}
      />

      <meta name="twitter:title" content={finalSocialTitle} />

      {finalSocialDescription && (
        <meta name="twitter:description" content={finalSocialDescription} />
      )}

      {finalImage && <meta name="twitter:image" content={finalImage} />}

      {/* =================================================
          SCHEMA.ORG
      ================================================= */}

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
