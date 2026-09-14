// ======================================================
// VTD SEO
// Motor de análisis SEO
// Viaja a tu Destino
// ======================================================

const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const stripHtml = (value = "") =>
  String(value)
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

const containsKeyword = (
  value = "",
  keyword = ""
) => {
  if (!keyword.trim()) {
    return false;
  }

  return normalizeText(value).includes(
    normalizeText(keyword)
  );
};

const isValidUrl = (
  value = ""
) => {
  if (!value) {
    return false;
  }

  try {
    const url =
      new URL(value);

    return (
      url.protocol ===
        "http:" ||
      url.protocol ===
        "https:"
    );
  } catch {
    return false;
  }
};

// ======================================================
// RESULTADO DE UNA REGLA
// ======================================================

const createCheck = ({
  id,
  label,
  status,
  points,
  earned,
  category = "seo",
}) => ({
  id,
  label,
  status,
  points,
  earned,
  category,
});

// ======================================================
// ANALIZAR SEO
// ======================================================

export const analyzeSeo = ({
  title = "",
  description = "",
  focusKeyword = "",
  canonicalUrl = "",
  image = "",
  socialTitle = "",
  socialDescription = "",
  index = true,
  follow = true,

  // Opcionales para contenidos como Blog
  content = "",
  slug = "",
  imageAlt = "",
}) => {
  const checks = [];

  const cleanTitle =
    String(title).trim();

  const cleanDescription =
    String(
      description
    ).trim();

  const cleanKeyword =
    String(
      focusKeyword
    ).trim();

  const cleanSocialTitle =
    String(
      socialTitle
    ).trim();

  const cleanSocialDescription =
    String(
      socialDescription
    ).trim();

  // ====================================================
  // 1. FRASE CLAVE
  // ====================================================

  checks.push(
    createCheck({
      id: "focus-keyword",

      label:
        cleanKeyword
          ? "Frase clave objetivo definida."
          : "Define una frase clave objetivo.",

      status:
        cleanKeyword
          ? "good"
          : "error",

      points: 10,

      earned:
        cleanKeyword
          ? 10
          : 0,
    })
  );

  // ====================================================
  // 2. TÍTULO SEO
  // ====================================================

  const titleLength =
    cleanTitle.length;

  if (!cleanTitle) {
    checks.push(
      createCheck({
        id: "seo-title",

        label:
          "Agrega un título SEO.",

        status:
          "error",

        points: 12,

        earned: 0,
      })
    );
  } else if (
    titleLength >= 30 &&
    titleLength <= 60
  ) {
    checks.push(
      createCheck({
        id: "seo-title",

        label:
          "El título SEO tiene una longitud adecuada.",

        status:
          "good",

        points: 12,

        earned: 12,
      })
    );
  } else {
    checks.push(
      createCheck({
        id: "seo-title",

        label:
          titleLength < 30
            ? "El título SEO podría ser más descriptivo."
            : "El título SEO podría mostrarse recortado en los resultados.",

        status:
          "warning",

        points: 12,

        earned: 6,
      })
    );
  }

  // ====================================================
  // 3. FRASE CLAVE EN TÍTULO
  // ====================================================

  const keywordInTitle =
    cleanKeyword &&
    containsKeyword(
      cleanTitle,
      cleanKeyword
    );

  checks.push(
    createCheck({
      id: "keyword-title",

      label:
        !cleanKeyword
          ? "Define una frase clave para analizar el título."
          : keywordInTitle
            ? "La frase clave aparece en el título SEO."
            : "Considera incluir la frase clave en el título SEO.",

      status:
        !cleanKeyword
          ? "warning"
          : keywordInTitle
            ? "good"
            : "warning",

      points: 10,

      earned:
        keywordInTitle
          ? 10
          : 0,
    })
  );

  // ====================================================
  // 4. META DESCRIPTION
  // ====================================================

  const descriptionLength =
    cleanDescription.length;

  if (!cleanDescription) {
    checks.push(
      createCheck({
        id: "meta-description",

        label:
          "Agrega una meta descripción.",

        status:
          "error",

        points: 12,

        earned: 0,
      })
    );
  } else if (
    descriptionLength >= 120 &&
    descriptionLength <= 160
  ) {
    checks.push(
      createCheck({
        id: "meta-description",

        label:
          "La meta descripción tiene una longitud adecuada.",

        status:
          "good",

        points: 12,

        earned: 12,
      })
    );
  } else {
    checks.push(
      createCheck({
        id: "meta-description",

        label:
          descriptionLength <
          120
            ? "La meta descripción podría aprovechar mejor el espacio disponible."
            : "La meta descripción podría mostrarse recortada.",

        status:
          "warning",

        points: 12,

        earned: 6,
      })
    );
  }

  // ====================================================
  // 5. FRASE CLAVE EN DESCRIPTION
  // ====================================================

  const keywordInDescription =
    cleanKeyword &&
    containsKeyword(
      cleanDescription,
      cleanKeyword
    );

  checks.push(
    createCheck({
      id:
        "keyword-description",

      label:
        !cleanKeyword
          ? "Define una frase clave para analizar la descripción."
          : keywordInDescription
            ? "La frase clave aparece en la meta descripción."
            : "Considera incluir la frase clave de forma natural en la meta descripción.",

      status:
        !cleanKeyword
          ? "warning"
          : keywordInDescription
            ? "good"
            : "warning",

      points: 10,

      earned:
        keywordInDescription
          ? 10
          : 0,
    })
  );

  // ====================================================
  // 6. CANONICAL
  // ====================================================

  if (!canonicalUrl) {
    checks.push(
      createCheck({
        id: "canonical",

        label:
          "No hay canonical personalizado. Se podrá usar la URL actual automáticamente.",

        status:
          "warning",

        points: 8,

        earned: 4,
      })
    );
  } else if (
    isValidUrl(
      canonicalUrl
    )
  ) {
    checks.push(
      createCheck({
        id: "canonical",

        label:
          "La URL canónica es válida.",

        status:
          "good",

        points: 8,

        earned: 8,
      })
    );
  } else {
    checks.push(
      createCheck({
        id: "canonical",

        label:
          "La URL canónica no es válida.",

        status:
          "error",

        points: 8,

        earned: 0,
      })
    );
  }

  // ====================================================
  // 7. IMAGEN SOCIAL
  // ====================================================

  if (!image) {
    checks.push(
      createCheck({
        id: "social-image",

        label:
          "Agrega una imagen social para mejorar la vista previa al compartir.",

        status:
          "warning",

        points: 10,

        earned: 0,

        category:
          "social",
      })
    );
  } else if (
    isValidUrl(image)
  ) {
    checks.push(
      createCheck({
        id: "social-image",

        label:
          "La imagen social está configurada.",

        status:
          "good",

        points: 10,

        earned: 10,

        category:
          "social",
      })
    );
  } else {
    checks.push(
      createCheck({
        id: "social-image",

        label:
          "La URL de la imagen social no es válida.",

        status:
          "error",

        points: 10,

        earned: 0,

        category:
          "social",
      })
    );
  }

  // ====================================================
  // 8. TÍTULO SOCIAL
  // ====================================================

  checks.push(
    createCheck({
      id: "social-title",

      label:
        cleanSocialTitle
          ? "Título social personalizado."
          : "Se utilizará el título SEO como título social.",

      status:
        cleanSocialTitle
          ? "good"
          : "warning",

      points: 5,

      earned:
        cleanSocialTitle
          ? 5
          : 3,

      category:
        "social",
    })
  );

  // ====================================================
  // 9. DESCRIPCIÓN SOCIAL
  // ====================================================

  checks.push(
    createCheck({
      id:
        "social-description",

      label:
        cleanSocialDescription
          ? "Descripción social personalizada."
          : "Se utilizará la meta descripción en redes sociales.",

      status:
        cleanSocialDescription
          ? "good"
          : "warning",

      points: 5,

      earned:
        cleanSocialDescription
          ? 5
          : 3,

      category:
        "social",
    })
  );

  // ====================================================
  // 10. INDEXACIÓN
  // ====================================================

  checks.push(
    createCheck({
      id: "index",

      label:
        index
          ? "La página puede ser indexada."
          : "La página está configurada como noindex.",

      status:
        index
          ? "good"
          : "warning",

      points: 3,

      earned:
        index
          ? 3
          : 1,

      category:
        "technical",
    })
  );

  // ====================================================
  // 11. FOLLOW
  // ====================================================

  checks.push(
    createCheck({
      id: "follow",

      label:
        follow
          ? "Los buscadores pueden seguir los enlaces."
          : "Los enlaces están configurados como nofollow.",

      status:
        follow
          ? "good"
          : "warning",

      points: 3,

      earned:
        follow
          ? 3
          : 1,

      category:
        "technical",
    })
  );

  // ====================================================
  // ANÁLISIS DE CONTENIDO
  // Solo se activa si enviamos content.
  // Será útil para Blog.
  // ====================================================

  let wordCount = 0;

  if (content) {
    const plainContent =
      stripHtml(
        content
      );

    wordCount =
      plainContent
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const keywordInContent =
      cleanKeyword &&
      containsKeyword(
        plainContent,
        cleanKeyword
      );

    checks.push(
      createCheck({
        id:
          "keyword-content",

        label:
          !cleanKeyword
            ? "Define una frase clave para analizar el contenido."
            : keywordInContent
              ? "La frase clave aparece en el contenido."
              : "La frase clave no aparece en el contenido.",

        status:
          !cleanKeyword
            ? "warning"
            : keywordInContent
              ? "good"
              : "warning",

        points: 8,

        earned:
          keywordInContent
            ? 8
            : 0,

        category:
          "content",
      })
    );
  }

  // ====================================================
  // SLUG
  // Solo para contenidos dinámicos
  // ====================================================

  if (
    slug &&
    cleanKeyword
  ) {
    const readableSlug =
      String(slug).replace(
        /-/g,
        " "
      );

    const keywordInSlug =
      containsKeyword(
        readableSlug,
        cleanKeyword
      );

    checks.push(
      createCheck({
        id:
          "keyword-slug",

        label:
          keywordInSlug
            ? "La URL contiene la frase clave."
            : "Considera incluir la frase clave en la URL.",

        status:
          keywordInSlug
            ? "good"
            : "warning",

        points: 5,

        earned:
          keywordInSlug
            ? 5
            : 0,

        category:
          "technical",
      })
    );
  }

  // ====================================================
  // ALT
  // Para contenidos dinámicos
  // ====================================================

  if (imageAlt !== "") {
    checks.push(
      createCheck({
        id: "image-alt",

        label:
          imageAlt.trim()
            ? "La imagen tiene texto alternativo."
            : "Agrega texto alternativo a la imagen.",

        status:
          imageAlt.trim()
            ? "good"
            : "warning",

        points: 5,

        earned:
          imageAlt.trim()
            ? 5
            : 0,

        category:
          "content",
      })
    );
  }

  // ====================================================
  // PUNTUACIÓN
  // ====================================================

  const totalPoints =
    checks.reduce(
      (
        total,
        check
      ) =>
        total +
        check.points,
      0
    );

  const earnedPoints =
    checks.reduce(
      (
        total,
        check
      ) =>
        total +
        check.earned,
      0
    );

  const score =
    totalPoints
      ? Math.round(
          (earnedPoints /
            totalPoints) *
            100
        )
      : 0;

  let status =
    "poor";

  let statusLabel =
    "Necesita mejoras";

  if (score >= 80) {
    status = "good";

    statusLabel =
      "Muy bueno";
  } else if (
    score >= 60
  ) {
    status =
      "warning";

    statusLabel =
      "Puede mejorar";
  }

  // ====================================================
  // CONTADORES
  // ====================================================

  const goodCount =
    checks.filter(
      (check) =>
        check.status ===
        "good"
    ).length;

  const warningCount =
    checks.filter(
      (check) =>
        check.status ===
        "warning"
    ).length;

  const errorCount =
    checks.filter(
      (check) =>
        check.status ===
        "error"
    ).length;

  // ====================================================
  // RESULTADO
  // ====================================================

  return {
    score,

    status,

    statusLabel,

    checks,

    summary: {
      good:
        goodCount,

      warning:
        warningCount,

      error:
        errorCount,
    },

    metrics: {
      titleLength,

      descriptionLength,

      socialTitleLength:
        cleanSocialTitle.length,

      socialDescriptionLength:
        cleanSocialDescription.length,

      wordCount,
    },
  };
};

// ======================================================
// HELPERS EXPORTABLES
// ======================================================

export {
  normalizeText,
  stripHtml,
  containsKeyword,
  isValidUrl,
};